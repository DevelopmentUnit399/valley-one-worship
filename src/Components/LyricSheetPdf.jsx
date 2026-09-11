import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 36,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#111827',
    lineHeight: 1.35,
  },
  header: {
    marginBottom: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: '#111827',
    borderBottomStyle: 'solid',
    paddingBottom: 6,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    lineHeight: 1.2,
    marginBottom: 2,
  },
  artist: {
    fontSize: 9.5,
    color: '#6b7280',
    fontFamily: 'Helvetica',
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  column: {
    width: '48%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  sectionWrapper: {
    marginBottom: 10,
  },
  sectionWrapperFirst: {
    marginTop: 0,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: '#4f46e5',
    textTransform: 'uppercase',
    marginBottom: 3,
    letterSpacing: 0.5,
    lineHeight: 1.1,
  },
  lyricLine: {
    fontSize: 8.5,
    color: '#1f2937',
    marginBottom: 1.5,
    lineHeight: 1.3,
  },
})

export const LyricSheetPdfDocument = ({ docData }) => {
  const { metadata, sections = [] } = docData

  // Clean sections to remove leading empty lines that push headers down
  const cleanedSections = sections
    .map((sec) => ({
      ...sec,
      lines: sec.lines.filter((l, idx) => !(idx === 0 && !l.trim())),
    }))
    .filter((sec) => sec.title || sec.lines.length > 0)

  // Split evenly by section count
  const half = Math.ceil(cleanedSections.length / 2)
  const leftSections = cleanedSections.slice(0, half)
  const rightSections = cleanedSections.slice(half)

  const renderSectionList = (list) =>
    list.map((sec, idx) => (
      <View
        key={idx}
        style={idx === 0 ? styles.sectionWrapperFirst : styles.sectionWrapper}
      >
        {sec.title ? <Text style={styles.sectionTitle}>{sec.title}</Text> : null}
        {sec.lines.map((lineText, lIdx) => (
          <Text key={lIdx} style={styles.lyricLine}>
            {lineText.trim() ? lineText : '\u00A0'}
          </Text>
        ))}
      </View>
    ))

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{metadata.title}</Text>
          {metadata.artist ? <Text style={styles.artist}>{metadata.artist}</Text> : null}
        </View>

        <View style={styles.columnsContainer}>
          <View style={styles.column}>{renderSectionList(leftSections)}</View>
          <View style={styles.column}>{renderSectionList(rightSections)}</View>
        </View>
      </Page>
    </Document>
  )
}
