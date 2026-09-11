export const KEYS = [
  'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B',
  'Cm', 'C#m', 'Dbm', 'Dm', 'D#m', 'Ebm', 'Em', 'Fm', 'F#m', 'Gbm', 'Gm', 'G#m', 'Abm', 'Am', 'A#m', 'Bbm', 'Bm'
];

const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const ENHARMONIC_MAP = {
  Db: 'C#',
  Eb: 'D#',
  Gb: 'F#',
  Ab: 'G#',
  Bb: 'A#'
};

export const getNoteIndex = (note) => {
  if (!note) return -1;
  const match = note.match(new RegExp('^[A-G][b#]?'));
  if (!match) return -1;
  const root = match[0];
  const standardRoot = ENHARMONIC_MAP[root] || root;
  return CHROMATIC_SCALE.indexOf(standardRoot);
};

export const getSemitoneDistance = (fromKey, toKey) => {
  const fromIdx = getNoteIndex(fromKey);
  const toIdx = getNoteIndex(toKey);
  if (fromIdx === -1 || toIdx === -1) return 0;
  return (toIdx - fromIdx + 12) % 12;
};

export const transposeNote = (note, semitones) => {
  const normalized = ENHARMONIC_MAP[note] || note;
  const idx = CHROMATIC_SCALE.indexOf(normalized);
  if (idx === -1) return note;
  const newIdx = (idx + semitones + 120) % 12;
  return CHROMATIC_SCALE[newIdx];
};

export const transposeChord = (chord, semitones) => {
  const noteRegex = new RegExp('([A-G][b#]?)', 'g');
  return chord.replace(noteRegex, (match) => transposeNote(match, semitones));
};

const parseLineSegments = (line, semitones) => {
  const tokens = [];
  let buffer = '';
  let activeChord = '';

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '[') {
      if (buffer.length > 0) {
        tokens.push({ chord: activeChord, lyric: buffer });
        buffer = '';
        activeChord = '';
      }
    } else if (char === ']') {
      activeChord = transposeChord(buffer, semitones);
      buffer = '';
    } else {
      buffer += char;
    }
  }

  if (buffer.length > 0 || activeChord.length > 0) {
    tokens.push({ chord: activeChord, lyric: buffer });
  }

  return tokens;
};

export const parseChordPro = (text = '', semitones = 0, targetKey = '') => {
  if (!text) {
    return { metadata: { title: 'Untitled Chart', artist: '', key: '', capo: '' }, lines: [] };
  }

  const lines = text.split('\n');
  const metadata = { title: 'Untitled Chart', artist: '', key: '', capo: '' };
  const parsedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    const directivePattern = new RegExp('^\\{(title|t|artist|a|key|capo):\\s*(.*?)\\}', 'i');
    const directiveMatch = trimmed.match(directivePattern);

    if (directiveMatch) {
      const key = directiveMatch[1].toLowerCase();
      const val = directiveMatch[2].trim();
      if (key === 'title' || key === 't') metadata.title = val;
      if (key === 'artist' || key === 'a') metadata.artist = val;
      if (key === 'key') metadata.key = val;
      if (key === 'capo') metadata.capo = val;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    const isDirective = new RegExp('^\\{(title|t|artist|a|key|capo):', 'i').test(trimmed);

    if (isDirective) {
      continue;
    } else if (trimmed.startsWith('#') || trimmed.toLowerCase().startsWith('{comment') || trimmed.toLowerCase().startsWith('{c:')) {
      const cleanComment = trimmed
        .replace(new RegExp('^\\{(comment|c):?\\s*', 'i'), '')
        .replace(new RegExp('\\}$'), '')
        .replace(new RegExp('^#\\s*'), '');
      parsedLines.push({ type: 'comment', value: cleanComment });
    } else if (trimmed === '') {
      parsedLines.push({ type: 'empty' });
    } else {
      const tokens = parseLineSegments(lines[i], semitones);
      parsedLines.push({ type: 'lyric-line', tokens });
    }
  }

  if (targetKey) {
    metadata.key = targetKey;
  } else if (metadata.key && semitones !== 0) {
    metadata.key = transposeChord(metadata.key, semitones);
  }

  return { metadata, lines: parsedLines };
};

// Strips [chords] and directives for display on the webpage lyrics section
export const chordProToPlainLyrics = (text = '') => {
  if (!text) return '';
  return text
    .split('\n')
    .filter((line) => !new RegExp('^\\{\\s*(title|t|artist|a|key|capo):', 'i').test(line.trim()))
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('{comment') || trimmed.startsWith('{c:')) {
        return trimmed.replace(new RegExp('^\\{(comment|c):?\\s*', 'i'), '').replace(new RegExp('\\}$'), '');
      }
      return line.replace(new RegExp('\\[.*?\\]', 'g'), '');
    })
    .join('\n');
};

// Parses ChordPro text into grouped sections for the lyrics-only PDF
export const parseChordProForLyricsPdf = (text = '') => {
  const lines = text.split('\n');
  const metadata = { title: 'Untitled Chart', artist: '' };
  const parsedSections = [];
  let currentSection = { title: '', lines: [] };

  lines.forEach((rawLine) => {
    const trimmed = rawLine.trim();

    const titleMatch = trimmed.match(new RegExp('^\\{\\s*(?:title|t):\\s*(.*?)\\}', 'i'));
    if (titleMatch) metadata.title = titleMatch[1].trim();

    const artistMatch = trimmed.match(new RegExp('^\\{\\s*(?:artist|a):\\s*(.*?)\\}', 'i'));
    if (artistMatch) metadata.artist = artistMatch[1].trim();

    if (trimmed.startsWith('{comment') || trimmed.startsWith('{c:')) {
      if (currentSection.title || currentSection.lines.length > 0) {
        parsedSections.push(currentSection);
      }
      const sectionName = trimmed
        .replace(new RegExp('^\\{(comment|c):?\\s*', 'i'), '')
        .replace(new RegExp('\\}$'), '');
      currentSection = { title: sectionName, lines: [] };
    } else if (!new RegExp('^\\{').test(trimmed)) {
      const cleanLine = rawLine.replace(new RegExp('\\[.*?\\]', 'g'), '');
      currentSection.lines.push(cleanLine);
    }
  });

  if (currentSection.title || currentSection.lines.length > 0) {
    parsedSections.push(currentSection);
  }

  return { metadata, sections: parsedSections };
};

const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];

export const chordToNumber = (chord, songKey = 'C') => {
  if (!chord) return '';
  
  const rootIndex = getNoteIndex(songKey);
  if (rootIndex === -1) return chord;

  // Handles slash chords like D/F# or 1/3
  if (chord.includes('/')) {
    const [main, bass] = chord.split('/');
    return `${chordToNumber(main, songKey)}/${chordToNumber(bass, songKey)}`;
  }

  // Extract root note (e.g. "C#", "Bb", "G")
  const match = chord.match(new RegExp('^([A-G][b#]?)(.*)'));
  if (!match) return chord;

  const note = match[1];
  const suffix = match[2]; // m, maj7, sus4, 5, etc.
  const chordNoteIndex = getNoteIndex(note);
  if (chordNoteIndex === -1) return chord;

  // Semitone distance above scale root (0 to 11)
  const diff = (chordNoteIndex - rootIndex + 12) % 12;

  // Match against standard major scale degrees 1-7
  const degreeIndex = MAJOR_SCALE_INTERVALS.indexOf(diff);
  if (degreeIndex !== -1) {
    return `${degreeIndex + 1}${suffix}`;
  }

  // Accidental degree handling (b3, #4, b7, etc.)
  const accidentalMap = {
    1: 'b2',
    3: 'b3',
    6: '#4',
    8: 'b6',
    10: 'b7'
  };

  const degree = accidentalMap[diff] || diff;
  return `${degree}${suffix}`;
};

export const parseChordProForNumbers = (text = '') => {
  // First parse directives and structure with 0 semitone shift
  const parsed = parseChordPro(text, 0);
  const songKey = parsed.metadata.key || 'C';

  // Swap chord symbols to Nashville Numbers
  const numberedLines = parsed.lines.map((line) => {
    if (line.type !== 'lyric-line') return line;

    return {
      ...line,
      tokens: line.tokens.map((tok) => ({
        ...tok,
        chord: tok.chord ? chordToNumber(tok.chord, songKey) : ''
      }))
    };
  });

  return {
    ...parsed,
    lines: numberedLines
  };
};
