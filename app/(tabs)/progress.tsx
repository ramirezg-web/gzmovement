import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Award, Calendar, Heart, Target, Star, Flame } from 'lucide-react-native';

export default function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const periods = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'year', label: 'This Year' },
  ];

  const stats = {
    week: {
      workouts: 4,
      minutes: 68,
      streak: 3,
      goal: 5,
    },
    month: {
      workouts: 16,
      minutes: 280,
      streak: 8,
      goal: 20,
    },
    year: {
      workouts: 89,
      minutes: 1420,
      streak: 12,
      goal: 150,
    },
  };

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Completed your first workout',
      icon: Star,
      color: '#F59E0B',
      earned: true,
      date: '2 weeks ago',
    },
    {
      id: 2,
      title: 'Consistency Champion',
      description: '7 days in a row',
      icon: Flame,
      color: '#EF4444',
      earned: true,
      date: '1 week ago',
    },
    {
      id: 3,
      title: 'Mobility Master',
      description: '10 mobility sessions',
      icon: Heart,
      color: '#8B5CF6',
      earned: true,
      date: '3 days ago',
    },
    {
      id: 4,
      title: 'Goal Crusher',
      description: 'Reached monthly goal',
      icon: Target,
      color: '#10B981',
      earned: false,
      progress: 80,
    },
  ];

  const weeklyData = [
    { day: 'Mon', completed: true, duration: 15 },
    { day: 'Tue', completed: true, duration: 20 },
    { day: 'Wed', completed: false, duration: 0 },
    { day: 'Thu', completed: true, duration: 12 },
    { day: 'Fri', completed: true, duration: 18 },
    { day: 'Sat', completed: false, duration: 0 },
    { day: 'Sun', completed: false, duration: 0 },
  ];

  const currentStats = stats[selectedPeriod];
  const goalProgress = (currentStats.workouts / currentStats.goal) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Progress</Text>
        <Text style={styles.subtitle}>Celebrating every step of your journey</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period.id}
              style={[
                styles.periodButton,
                selectedPeriod === period.id && styles.periodButtonActive
              ]}
              onPress={() => setSelectedPeriod(period.id)}
            >
              <Text style={[
                styles.periodText,
                selectedPeriod === period.id && styles.periodTextActive
              ]}>
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={[styles.statCard, styles.primaryStatCard]}>
              <View style={styles.statIcon}>
                <TrendingUp size={24} color="#14B8A6" />
              </View>
              <Text style={styles.statNumber}>{currentStats.workouts}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.min(goalProgress, 100)}%` }]} />
              </View>
              <Text style={styles.goalText}>{currentStats.workouts} of {currentStats.goal} goal</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#FEF3C7' }]}>
                <Calendar size={20} color="#F59E0B" />
              </View>
              <Text style={styles.statNumber}>{currentStats.minutes}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: '#FECACA' }]}>
                <Flame size={20} color="#EF4444" />
              </View>
              <Text style={styles.statNumber}>{currentStats.streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week's Activity</Text>
          <View style={styles.weeklyChart}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <View style={[
                  styles.activityBar,
                  { height: day.duration * 3 + 20 },
                  day.completed ? styles.activityBarCompleted : styles.activityBarEmpty
                ]} />
                <Text style={styles.dayLabel}>{day.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View key={achievement.id} style={[
                styles.achievementCard,
                !achievement.earned && styles.achievementCardLocked
              ]}>
                <View style={[
                  styles.achievementIcon,
                  { backgroundColor: `${achievement.color}20` },
                  !achievement.earned && styles.achievementIconLocked
                ]}>
                  <achievement.icon 
                    size={24} 
                    color={achievement.earned ? achievement.color : '#D1D5DB'} 
                  />
                </View>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.earned && styles.achievementTitleLocked
                ]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                {achievement.earned ? (
                  <Text style={styles.achievementDate}>{achievement.date}</Text>
                ) : (
                  <View style={styles.achievementProgress}>
                    <View style={styles.achievementProgressBar}>
                      <View style={[
                        styles.achievementProgressFill,
                        { width: `${achievement.progress}%` }
                      ]} />
                    </View>
                    <Text style={styles.achievementProgressText}>{achievement.progress}%</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Motivation */}
        <View style={styles.motivationSection}>
          <View style={styles.motivationCard}>
            <Award size={32} color="#14B8A6" />
            <Text style={styles.motivationTitle}>You're doing amazing!</Text>
            <Text style={styles.motivationText}>
              Every workout, every movement, every choice to prioritize your wellness matters. 
              You're building strength not just in your body, but in your commitment to yourself.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  periodSelector: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  periodTextActive: {
    color: '#111827',
    fontWeight: '600',
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryStatCard: {
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#14B8A6',
  },
  statIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F0FDFA',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginTop: 12,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#14B8A6',
    borderRadius: 3,
  },
  goalText: {
    fontSize: 12,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  weeklyChart: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  activityBar: {
    width: 16,
    borderRadius: 8,
    marginBottom: 8,
    minHeight: 20,
  },
  activityBarCompleted: {
    backgroundColor: '#14B8A6',
  },
  activityBarEmpty: {
    backgroundColor: '#E5E7EB',
  },
  dayLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  achievementIconLocked: {
    backgroundColor: '#F3F4F6',
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementTitleLocked: {
    color: '#9CA3AF',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 8,
  },
  achievementDate: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  achievementProgress: {
    width: '100%',
    alignItems: 'center',
  },
  achievementProgressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 4,
  },
  achievementProgressFill: {
    height: '100%',
    backgroundColor: '#14B8A6',
    borderRadius: 2,
  },
  achievementProgressText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '500',
  },
  motivationSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  motivationCard: {
    backgroundColor: '#F0FDFA',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#14B8A6',
  },
  motivationTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  motivationText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});