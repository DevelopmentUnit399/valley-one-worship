import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        paddingTop: 24,
        paddingBottom: 24,
        paddingHorizontal: 28,
        fontFamily: 'Helvetica',
        fontSize: 8,
        color: '#1a1a1a',
        lineHeight: 1.2
    },
    header: {
        marginBottom: 10,
        borderBottomWidth: 1.5,
        borderBottomColor: '#2b2d42',
        borderBottomStyle: 'solid',
        paddingBottom: 6
    },
    title: {
        fontSize: 18,
        fontFamily: 'Helvetica-Bold',
        color: '#111827',
        lineHeight: 1.2,
        marginBottom: 4
    },
    metaRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 12
    },
    metaText: {
        fontSize: 8,
        color: '#4b5563'
    },
    metaBold: {
        fontFamily: 'Helvetica-Bold',
        color: '#111827'
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
        marginBottom: 6
    },
    comment: {
        fontSize: 8,
        fontFamily: 'Helvetica-Bold',
        color: '#4f46e5',
        marginTop: 4,
        marginBottom: 2,
        paddingVertical: 2,
        paddingHorizontal: 4,
        backgroundColor: '#eef2ff'
    },
    line: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 1.5
    },
    emptyLine: {
        height: 4
    },
    segment: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    chord: {
        fontSize: 7.5,
        fontFamily: 'Helvetica-Bold',
        color: '#0284c7',
        minHeight: 9.5
    },
    lyric: {
        fontSize: 7.5,
        fontFamily: 'Courier',
        minHeight: 9.5
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
        <View key={secIdx} style={styles.sectionWrapper}>
            {section.map((item, idx) => {
                if (item.type === 'empty') {
                    return <View key={idx} style={styles.emptyLine} />
                }
                if (item.type === 'comment') {
                    return <Text key={idx} style={styles.comment}>{item.value}</Text>
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

    const sections = groupIntoSections(lines)
    const { left, right } = splitSectionsIntoColumns(sections)

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>{metadata.title}</Text>
                    <View style={styles.metaRow}>
                        {metadata.artist ? (
                            <Text style={styles.metaText}>
                                Artist: <Text style={styles.metaBold}>{metadata.artist}</Text>
                            </Text>
                        ) : null}

                        {/* If it is a number chart, simply display "Key: Numbers" */}
                        {metadata.key ? (
                            <Text style={styles.metaText}>
                                Key: <Text style={styles.metaBold}>{isNumberChart ? 'Numbers' : metadata.key}</Text>
                            </Text>
                        ) : null}

                        {metadata.capo && !isNumberChart ? (
                            <Text style={styles.metaText}>
                                Capo: <Text style={styles.metaBold}>{metadata.capo}</Text>
                            </Text>
                        ) : null}

                        {/* Omit Transposition on Number Charts */}
                        {!isNumberChart && (
                            <Text style={styles.metaText}>
                                Transposition: <Text style={styles.metaBold}>{semitones >= 0 ? `+${semitones}` : semitones} semitones</Text>
                            </Text>
                        )}
                    </View>
                </View>

                {/* 2-Column Section Layout */}
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
