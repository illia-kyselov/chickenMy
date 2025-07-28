import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
import { format, subDays } from 'date-fns';

import TouchBar from '../components/TouchBar';
import EggProductionSVG from '../../assets/svg/EggProductionSVG';
import ProductivityChartSVG from '../../assets/svg/ProductivityChartSVG';
import ArrowLeftSVG from '../../assets/svg/ArrowLeftSVG';
import ArrowRightSVG from '../../assets/svg/ArrowRightSVG';
import EggStatisticsBySVG from '../../assets/svg/EggStatisticsBySVG';

const { width, height } = Dimensions.get('window');

const getLast7DaysData = (productivity) => {
    const last7Dates = Array.from({ length: 7 }, (_, i) =>
        format(subDays(new Date(), 6 - i), 'yyyy-MM-dd')
    );
    return last7Dates.map((dateStr) => {
        const found = productivity.find((p) => p.date === dateStr);
        return found ? found.count : 0;
    });
};

const StatsScreen = () => {
    const navigation = useNavigation();
    const chickens = useSelector((state) => state.chickens.items);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [statsType, setStatsType] = useState('DAY');
    const [isPressed, setIsPressed] = useState(false);
    const currentChicken = chickens[selectedIndex] || null;

    const handlePrev = () => {
        setSelectedIndex((prev) => (prev === 0 ? chickens.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev + 1) % chickens.length);
    };

    const handleSwitchStatsType = (direction) => {
        const types = ['DAY', 'WEEK', 'MONTH'];
        const currentIndex = types.indexOf(statsType);
        const nextIndex =
            direction === 'next'
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
                const labels = Array.from({ length: 7 }, (_, i) =>
                    new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })
                );
                const values = labels.map((_, i) => {
                    const targetDate = format(subDays(new Date(), 6 - i), 'yyyy-MM-dd');
                    const match = prod.find(p => p.date === targetDate);
                    return match ? match.count : 0;
                });

                return { labels, values };
            }
        }
    };

    const productivityCounts =
        currentChicken?.productivity?.length > 0
            ? getLast7DaysData(currentChicken.productivity)
            : Array(7).fill(0);

    const maxValue = Math.max(...productivityCounts);
    const barData = getBarData();

    return (
        <ImageBackground source={require('../../assets/BGimg.jpg')} style={styles.background} resizeMode="cover">
            <SafeAreaView style={styles.container}>
                {chickens.length === 0 ? (
                    <View style={styles.emptyWrapper}>
                        <Text style={styles.emptyText}>No chickens yet</Text>
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.eggTitleWrapper}>
                            <EggProductionSVG width={260} height={44} />
                            <Text style={styles.dateText}>{new Date().toLocaleDateString('en-CA')}</Text>
                        </View>

                        <View style={styles.chartBlock}>
                            <View style={styles.svgWrapper}>
                                <ProductivityChartSVG width={326} height={25} />
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

                        <View style={styles.graphContainer}>
                            <LineChart
                                data={{ labels: ['1', '2', '3', '4', '5', '6', '7'], datasets: [{ data: productivityCounts }] }}
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
                                    productivityCounts.map((val, i) =>
                                        val === maxValue && val > 0 ? (
                                            <View
                                                key={i}
                                                style={{
                                                    position: 'absolute',
                                                    top: 25 + (180 - (val / 8) * 150),
                                                    left: (358 / 7) * i + 20,
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

                        <View style={styles.statsHeaderContainer}>
                            <EggStatisticsBySVG width={180} height={24} />
                            <View style={styles.statsSwitcherRow}>
                                <TouchableOpacity onPress={() => handleSwitchStatsType('prev')}>
                                    <ArrowLeftSVG width={20} height={20} />
                                </TouchableOpacity>
                                <Text style={styles.statsType}>{statsType}</Text>
                                <TouchableOpacity onPress={() => handleSwitchStatsType('next')}>
                                    <ArrowRightSVG width={20} height={20} />
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

                        <TouchableOpacity
                            style={[styles.addButton, isPressed && { backgroundColor: '#5E2D1D' }]}
                            onPress={() => {
                                setIsPressed(true);
                                setTimeout(() => {
                                    setIsPressed(false);
                                    navigation.navigate('AddEggScreen');
                                }, 200);
                            }}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.addButtonText, isPressed && { color: '#FFC108' }]}>Add</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}
                <TouchBar activeIndex={1} onPressIndex0={() => navigation.navigate('MainScreen')} />
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { width, height, flex: 1 },
    container: { flex: 1 },
    scrollContent: { paddingBottom: 160 },
    emptyWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: {
        fontSize: 24,
        fontFamily: 'Moderustic-SemiBold',
        color: '#5E2D1D',
        textAlign: 'center',
    },
    eggTitleWrapper: { alignItems: 'center' },
    dateText: {
        fontSize: 32,
        fontFamily: 'Moderustic-SemiBold',
        textAlign: 'center',
        color: '#5E2D1D',
        marginTop: 8,
    },
    chartBlock: {
        width: 358,
        borderRadius: 30,
        backgroundColor: '#FFFFFFCC',
        padding: 8,
        alignSelf: 'center',
        marginTop: 20,
    },
    svgWrapper: { alignItems: 'center', marginBottom: 4 },
    chickenSwitcher: {
        width: 326,
        height: 29,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        alignSelf: 'center',
    },
    chickenName: {
        fontSize: 24,
        textTransform: 'uppercase',
        color: '#5E2D1D',
        fontFamily: 'Moderustic-SemiBold',
    },
    graphContainer: {
        width: 358,
        height: 220,
        backgroundColor: 'transparent',
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 10,
        alignItems: 'center',
    },
    chart: { borderRadius: 15 },
    statsHeaderContainer: {
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: '#FFFFFFCC',
        borderRadius: 30,
        alignSelf: 'center',
        width: 358,
        alignItems: 'center',
        paddingVertical: 12,
    },
    statsSwitcherRow: {
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
    },
    statsType: {
        fontSize: 20,
        fontFamily: 'Moderustic-SemiBold',
        color: '#5E2D1D',
        textAlign: 'center',
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
    addButton: {
        width: 358,
        height: 49,
        backgroundColor: '#FFC108',
        borderRadius: 30,
        padding: 10,
        marginTop: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        fontFamily: 'Moderustic-SemiBold',
        fontSize: 24,
        color: '#5E2D1D',
        lineHeight: 24,
        letterSpacing: -0.41,
        textAlign: 'center',
    },
});

export default StatsScreen;
