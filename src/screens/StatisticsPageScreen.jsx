import React, { useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { format, subDays } from 'date-fns';

import TouchBar from '../components/TouchBar';
import StatisticsSVG from '../../assets/svg/StatisticsSVG';
import ArrowLeftSVG from '../../assets/svg/ArrowLeftSVG';
import ArrowRightSVG from '../../assets/svg/ArrowRightSVG';
import ChickensTextSVG from '../../assets/svg/ChickensTextSVG';
import ChickenSVG from '../../assets/svg/ChickenSmallIconSVG';

const { width, height } = Dimensions.get('window');

const getLineChartData = (productivity, statsType) => {
    const today = new Date();
    if (!productivity || productivity.length === 0) {
        return { labels: [], data: [] };
    }

    switch (statsType) {
        case 'WEEK': {
            const labels = ['1–7', '8–15', '16–22', '23–30'];
            const values = [0, 0, 0, 0];
            productivity.forEach(({ date, count }) => {
                const d = new Date(date);
                const diff = (today - d) / (1000 * 60 * 60 * 24);
                if (diff <= 30) {
                    if (diff <= 7) values[3] += count;
                    else if (diff <= 14) values[2] += count;
                    else if (diff <= 21) values[1] += count;
                    else values[0] += count;
                }
            });
            return { labels, data: values };
        }
        case 'MONTH': {
            const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const values = Array(12).fill(0);
            productivity.forEach(({ date, count }) => {
                const month = new Date(date).getMonth();
                values[month] += count;
            });
            return { labels, data: values };
        }
        default: {
            const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const data = labels.map((_, i) => {
                const date = format(subDays(new Date(), 6 - i), 'yyyy-MM-dd');
                const match = productivity.find(p => p.date === date);
                return match ? match.count : 0;
            });
            return { labels, data };
        }
    }
};

const StatisticsPageScreen = () => {
    const chickens = useSelector(state => state.chickens.items);
    const units = useSelector(state => state.units?.type || 'pieces');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [statsType, setStatsType] = useState('DAY');
    const currentChicken = chickens[selectedIndex] || null;

    const formatCount = (count) => {
        if (units === 'boxes') {
            return (count / 36).toFixed(2);
        }
        return count.toString();
    };

    const handlePrev = () => {
        setSelectedIndex(prev => (prev === 0 ? chickens.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedIndex(prev => (prev + 1) % chickens.length);
    };

    const handleSwitchStatsType = (direction) => {
        const types = ['DAY', 'WEEK', 'MONTH'];
        const currentIndex = types.indexOf(statsType);
        const nextIndex = direction === 'next'
            ? (currentIndex + 1) % types.length
            : (currentIndex - 1 + types.length) % types.length;
        setStatsType(types[nextIndex]);
    };

    const getBarData = () => {
        if (!currentChicken || !currentChicken.productivity) return { labels: [], values: [] };
        const today = new Date();
        const prod = currentChicken.productivity;

        switch (statsType) {
            case 'WEEK': {
                const labels = ['1–7', '8–15', '16–22', '23–30'];
                const values = [0, 0, 0, 0];
                prod.forEach(({ date, count }) => {
                    const d = new Date(date);
                    const diff = (today - d) / (1000 * 60 * 60 * 24);
                    if (diff <= 30) {
                        if (diff <= 7) values[3] += count;
                        else if (diff <= 14) values[2] += count;
                        else if (diff <= 21) values[1] += count;
                        else values[0] += count;
                    }
                });
                return { labels, values };
            }
            case 'MONTH': {
                const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const values = Array(12).fill(0);
                prod.forEach(({ date, count }) => {
                    const month = new Date(date).getMonth();
                    values[month] += count;
                });
                return { labels, values };
            }
            default: {
                const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                const values = labels.map((_, i) => {
                    const targetDate = format(subDays(new Date(), 6 - i), 'yyyy-MM-dd');
                    const match = prod.find((p) => p.date === targetDate);
                    return match ? match.count : 0;
                });
                return { labels, values };
            }
        }
    };
    const getAverageEggs = (productivity, statsType) => {
        if (!productivity || productivity.length === 0) return 0;
        const today = new Date();

        switch (statsType) {
            case 'WEEK': {
                const last30 = productivity.filter(({ date }) => {
                    const d = new Date(date);
                    return (today - d) / (1000 * 60 * 60 * 24) <= 30;
                });
                const weeks = [[], [], [], []];
                last30.forEach(({ date, count }) => {
                    const d = new Date(date);
                    const diff = (today - d) / (1000 * 60 * 60 * 24);
                    if (diff <= 7) weeks[3].push(count);
                    else if (diff <= 14) weeks[2].push(count);
                    else if (diff <= 21) weeks[1].push(count);
                    else weeks[0].push(count);
                });
                const weekSums = weeks.map(w => w.reduce((a, b) => a + b, 0));
                const average = weekSums.reduce((a, b) => a + b, 0) / weekSums.length;
                return Math.round(average);
            }
            case 'MONTH': {
                const grouped = {};
                productivity.forEach(({ date, count }) => {
                    const month = new Date(date).getMonth();
                    if (!grouped[month]) grouped[month] = [];
                    grouped[month].push(count);
                });
                const monthlyAvgs = Object.values(grouped).map(arr =>
                    arr.reduce((a, b) => a + b, 0)
                );
                const average = monthlyAvgs.reduce((a, b) => a + b, 0) / monthlyAvgs.length;
                return Math.round(average);
            }
            default: {
                const last7 = productivity.filter(({ date }) => {
                    const d = new Date(date);
                    return (today - d) / (1000 * 60 * 60 * 24) <= 7;
                });
                const total = last7.reduce((sum, p) => sum + p.count, 0);
                return Math.round(total / (last7.length || 1));
            }
        }
    };

    const barData = getBarData();
    const { labels: lineLabels, data: lineData } = getLineChartData(currentChicken?.productivity, statsType);
    const maxValue = Math.max(...lineData);
    const averageEggs = getAverageEggs(currentChicken?.productivity, statsType);

    return (
        <ImageBackground source={require('../../assets/BGimg.jpg')} style={styles.background} resizeMode="cover">
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.header}>
                    <View style={styles.chickenWrapper}>
                        <ChickenSVG width={80} height={82} />
                    </View>
                    <StatisticsSVG />
                </View>

                <View style={styles.chickenSwitcherWrapper}>
                    <View style={styles.chickensTextWrapper}>
                        <ChickensTextSVG />
                    </View>
                    <View style={styles.chickenSwitcher}>
                        <TouchableOpacity onPress={handlePrev}>
                            <ArrowLeftSVG width={24} height={24} />
                        </TouchableOpacity>
                        <Text style={styles.chickenName}>{currentChicken?.name || ''}</Text>
                        <TouchableOpacity onPress={handleNext}>
                            <ArrowRightSVG width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.barChartWrapper}>
                    {barData.labels.map((label, index) => {
                        const rawValue = barData.values[index];
                        const value = Number.isFinite(rawValue) ? rawValue : 0;
                        const max = Math.max(...barData.values.map(v => Number(v) || 0));
                        const heightRatio = max > 0 ? value / max : 0;
                        const barHeight = value === 0 ? 4 : heightRatio * 160;
                        const color = value <= 1 ? '#FF0000' : value <= 2 ? '#FFD600' : '#00C853';
                        return (
                            <View key={index} style={styles.barItem}>
                                <View style={[styles.bar, { height: barHeight, backgroundColor: color }]} />
                                <Text style={styles.barLabel}>{label}</Text>
                            </View>
                        );
                    })}
                </View>

                <View style={styles.statsHeaderContainer}>
                    <TouchableOpacity onPress={() => handleSwitchStatsType('prev')}>
                        <ArrowLeftSVG width={20} height={20} />
                    </TouchableOpacity>
                    <View style={styles.statsInfo}>
                        <Text style={styles.statsLabel}>Average number of eggs</Text>
                        <Text style={styles.statsType}>{statsType}</Text>
                        <Text style={styles.statsValue}>{averageEggs}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleSwitchStatsType('next')}>
                        <ArrowRightSVG width={20} height={20} />
                    </TouchableOpacity>
                </View>

                <View style={styles.lineChartContainer}>
                    <LineChart
                        data={{ labels: lineLabels, datasets: [{ data: lineData }] }}
                        width={358}
                        height={204}
                        withShadow={false}
                        fromZero
                        chartConfig={{
                            backgroundGradientFrom: '#FFFFFF00',
                            backgroundGradientTo: '#FFFFFF00',
                            decimalPlaces: 0,
                            color: () => '#5E2D1D',
                            labelColor: () => '#5E2D1D',
                            propsForBackgroundLines: { stroke: '#EAE2D9' },
                            propsForDots: {
                                r: '5',
                                strokeWidth: '2',
                                stroke: '#5E2D1D',
                                fill: '#5E2D1D',
                            },
                        }}
                        decorator={() =>
                            lineData.map((val, i) =>
                                val === maxValue && val > 0 ? (
                                    <View
                                        key={i}
                                        style={{
                                            position: 'absolute',
                                            top: 25 + (180 - (val / 8) * 150),
                                            left: (358 / lineData.length) * i + 20,
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: '#FFC108',
                                        }}
                                    />
                                ) : null
                            )
                        }
                        style={styles.chart}
                    />
                </View>

                <View style={styles.historyContainer}>
                    <Text style={styles.historyTitle}>History</Text>
                    {currentChicken?.productivity?.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).map((entry, index) => (
                        <Text key={index} style={styles.historyEntry}>
                            {entry.date}  –  {formatCount(entry.count)}
                        </Text>
                    ))}
                </View>

            </ScrollView>
            <TouchBar activeIndex={3} />
        </ImageBackground>
    );
};

export default StatisticsPageScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    background: { flex: 1 },
    scrollContent: { paddingBottom: 140 },

    header: {
        marginTop: 70,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        position: 'relative',
    },
    chickenWrapper: {
        position: 'absolute',
        left: 12,
        top: -12,
        zIndex: 10,
    },

    chickenSwitcherWrapper: {
        width: 358,
        height: 74,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        padding: 8,
        opacity: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        marginBottom: 20,
    },
    chickensTextWrapper: { marginBottom: 8, alignItems: 'center', justifyContent: 'center' },
    chickenSwitcher: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    chickenName: {
        fontSize: 24,
        textTransform: 'uppercase',
        color: '#5E2D1D',
        fontFamily: 'Moderustic-SemiBold',
    },

    barChartWrapper: {
        width: 358,
        height: 274,
        borderRadius: 30,
        backgroundColor: '#FFFFFFCC',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 8,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    barItem: { alignItems: 'center', justifyContent: 'flex-end' },
    bar: {
        width: 20,
        borderRadius: 4,
    },
    barLabel: {
        marginTop: 4,
        fontSize: 12,
        color: '#5E2D1D',
        fontFamily: 'Moderustic-SemiBold',
    },

    statsHeaderContainer: {
        backgroundColor: '#FFFFFFCC',
        borderRadius: 30,
        alignSelf: 'center',
        width: 358,
        height: 84,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 10,
        marginBottom: 22,
    },
    statsInfo: { alignItems: 'center', justifyContent: 'center' },
    statsLabel: {
        fontSize: 14,
        color: '#5E2D1D',
        fontFamily: 'Moderustic-SemiBold',
    },
    statsType: {
        fontSize: 20,
        color: '#5E2D1D',
        fontFamily: 'Moderustic-SemiBold',
        textTransform: 'uppercase',
    },
    statsValue: {
        fontSize: 18,
        color: '#5E2D1D',
        fontFamily: 'Moderustic-SemiBold',
        marginTop: 2,
    },

    lineChartContainer: {
        width: 358,
        height: 220,
        borderRadius: 30,
        backgroundColor: '#FFFFFFCC',
        alignSelf: 'center',
        marginBottom: 40,
    },
    chart: {
        borderRadius: 15,
    },

    historyContainer: {
        width: 358,
        borderRadius: 30,
        backgroundColor: '#FFFFFFCC',
        alignSelf: 'center',
        padding: 16,
        marginBottom: 40,
    },
    historyTitle: {
        fontSize: 18,
        color: '#5E2D1D',
        fontFamily: 'Moderustic-Medium',
        marginBottom: 8,
    },
    historyEntry: {
        fontSize: 16,
        color: '#5E2D1D',
        fontFamily: 'Moderustic-Regular',
        marginBottom: 4,
    },
});
