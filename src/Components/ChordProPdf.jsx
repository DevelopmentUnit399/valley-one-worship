import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        paddingTop: 24,
        paddingBottom: 24,
        paddingHorizontal: 28,
        fontFamily: 'Helvetica',
        fontSize: 8.5,
        color: '#000000',
        lineHeight: 1.2
    },
    headerBanner: {
        backgroundColor: '#e5e7eb',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 12,
        marginBottom: 16,
        width: '100%'
    },
    titleText: {
        fontSize: 15,
        fontFamily: 'Helvetica-Bold',
        color: '#000000',
        letterSpacing: -0.2,
        marginBottom: 8
    },
    subHeader: {
        fontSize: 7.5,
        color: '#000000',
        lineHeight: 1.2
    },
    subHeaderBold: {
        fontFamily: 'Helvetica-Bold'
    },
    columnsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%'
    },
    column: {
        width: '48%',
        flexDirection: 'column'
    },
    sectionWrapper: {
        marginBottom: 10
    },
    sectionTitle: {
        fontSize: 8.5,
        fontFamily: 'Helvetica-Bold',
        color: '#000000',
        marginBottom: 3
    },
    line: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 1
    },
    emptyLine: {
        height: 5
    },
    segment: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    chord: {
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        color: '#000000',
        minHeight: 10
    },
    lyric: {
        fontSize: 8,
        fontFamily: 'Helvetica',
        color: '#000000',
        minHeight: 10
    }
})

const groupIntoSections = (lines) => {
    const sections = []
    let currentSection = []

    lines.forEach((line) => {
        if (line.type === 'comment') {
            if (currentSection.length > 0) {
                sections.push(currentSection)
            }
            currentSection = [line]
        } else {
            currentSection.push(line)
        }
    })

    if (currentSection.length > 0) {
        sections.push(currentSection)
    }

    return sections
}

const splitSectionsIntoColumns = (sections) => {
    const totalLines = sections.reduce((acc, s) => acc + s.length, 0)
    const targetPerColumn = Math.ceil(totalLines / 2)

    const left = []
    const right = []
    let currentLeftCount = 0

    sections.forEach((section) => {
        if (currentLeftCount < targetPerColumn || left.length === 0) {
            left.push(section)
            currentLeftCount += section.length
        } else {
            right.push(section)
        }
    })

    return { left, right }
}

const renderSection = (section, secIdx) => {
    return (
        // wrap={false} stops react-pdf from splitting mid-verse across pages
        <View key={secIdx} style={styles.sectionWrapper} wrap={false}>
            {section.map((item, idx) => {
                if (item.type === 'empty') {
                    return <View key={idx} style={styles.emptyLine} />
                }
                if (item.type === 'comment') {
                    return (
                        <Text key={idx} style={styles.sectionTitle}>
                            {item.value}
                        </Text>
                    )
                }
                return (
                    <View key={idx} style={styles.line}>
                        {item.tokens.map((token, tIdx) => (
                            <View key={tIdx} style={styles.segment}>
                                <Text style={styles.chord}>{token.chord || ' '}</Text>
                                <Text style={styles.lyric}>
                                    {token.lyric ? token.lyric.replace(/ /g, '\u00A0') : '\u00A0'}
                                </Text>
                            </View>
                        ))}
                    </View>
                )
            })}
        </View>
    )
}

export const ChordProPdfDocument = ({ parsedData, semitones = 0 }) => {
    const { metadata, lines } = parsedData

    const isNumberChart = metadata.key?.toLowerCase().includes('number')

    const metaParts = []
    if (metadata.key) {
        metaParts.push(isNumberChart ? 'Numbers' : metadata.key)
    }
    if (metadata.tempo) {
        metaParts.push(`${metadata.tempo} bpm`)
    }
    if (metadata.time) {
        metaParts.push(metadata.time)
    }

    const metaBracket = metaParts.length > 0 ? ` [${metaParts.join(', ')}]` : ''

    const sections = groupIntoSections(lines)
    const { left, right } = splitSectionsIntoColumns(sections)

    return (
        <Document>
            <Page size="LETTER" style={styles.page}>
                <View style={styles.headerBanner}>
                    <Text style={styles.titleText}>
                        {metadata.title}{metaBracket}
                    </Text>
                    <Text style={styles.subHeader}>
                        <Text style={styles.subHeaderBold}>[Default Arrangement]</Text>
                        {metadata.artist ? ` by ${metadata.artist}` : ''}
                    </Text>
                </View>

                <View style={styles.columnsContainer}>
                    <View style={styles.column}>
                        {left.map((sec, idx) => renderSection(sec, `left-${idx}`))}
                    </View>
                    <View style={styles.column}>
                        {right.map((sec, idx) => renderSection(sec, `right-${idx}`))}
                    </View>
                </View>
            </Page>
        </Document>
    )
}