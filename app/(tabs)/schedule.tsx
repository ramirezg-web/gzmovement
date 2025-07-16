import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, Plus, Check, X, Shuffle } from 'lucide-react-native';

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const scheduledWorkouts = {
    1: [
      { id: 1, time: '7:00 AM', title: 'Gentle Morning Flow', duration: '15 min', completed: true },
      { id: 2, time: '12:30 PM', title: 'Lunch Break Walk', duration: '10 min', completed: false },
    ],
    2: [
      { id: 3, time: '12:00 PM', title: 'Desk Warrior Relief', duration: '12 min', completed: false },
      { id: 4, time: '6:00 PM', title: 'Hip Mobility', duration: '18 min', completed: false },
    ],
    3: [
      { id: 5, time: '8:00 AM', title: 'Core Stability', duration: '20 min', completed: false },
    ],
    4: [
      { id: 6, time: '12:15 PM', title: 'Mindful Movement', duration: '15 min', completed: false },
    ],
    5: [
      { id: 7, time: '7:30 AM', title: 'Energy Flow', duration: '15 min', completed: false },
      { id: 8, time: '5:30 PM', title: 'Post-Work Unwind', duration: '10 min', completed: false },
    ],
  };

  const todaysWorkouts = scheduledWorkouts[selectedDay] || [];

  const suggestions = [
    { title: 'Add a lunch break walk', icon: Clock, color: '#14B8A6' },
    { title: 'Schedule morning mobility', icon: Calendar, color: '#8B5CF6' },
    { title: 'Try a new routine', icon: Shuffle, color: '#F97316' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Schedule</Text>
        <Text style={styles.subtitle}>Consistency creates lasting change</Text>
      </View>

      {/* Week View */}
      <View style={styles.weekContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroll}>
          {daysOfWeek.map((day, index) => {
            const isToday = index === new Date().getDay();
            const isSelected = index === selectedDay;
            const hasWorkouts = scheduledWorkouts[index]?.length > 0;
            
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCard,
                  isSelected && styles.dayCardSelected,
                  isToday && !isSelected && styles.dayCardToday,
                ]}
                onPress={() => setSelectedDay(index)}
              >
                <Text style={[
                  styles.dayText,
                  isSelected && styles.dayTextSelected,
                  isToday && !isSelected && styles.dayTextToday,
                ]}>
                  {day}
                </Text>
                <Text style={[
                  styles.dateText,
                  isSelected && styles.dateTextSelected,
                  isToday && !isSelected && styles.dateTextToday,
                ]}>
                  {new Date(Date.now() + (index - new Date().getDay()) * 24 * 60 * 60 * 1000).getDate()}
                </Text>
                {hasWorkouts && (
                  <View style={[
                    styles.workoutDot,
                    isSelected && styles.workoutDotSelected,
                  ]} />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Selected Day Header */}
        <View style={styles.dayHeader}>
          <Text style={styles.dayTitle}>{fullDays[selectedDay]}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#14B8A6" />
            <Text style={styles.addButtonText}>Add Workout</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Workouts */}
        {todaysWorkouts.length > 0 ? (
          <View style={styles.workoutsSection}>
            {todaysWorkouts.map((workout) => (
              <View key={workout.id} style={styles.workoutItem}>
                <TouchableOpacity style={[
                  styles.checkButton,
                  workout.completed && styles.checkButtonCompleted
                ]}>
                  {workout.completed ? (
                    <Check size={16} color="#FFFFFF" />
                  ) : (
                    <View style={styles.checkCircle} />
                  )}
                </TouchableOpacity>
                
                <View style={styles.workoutInfo}>
                  <Text style={[
                    styles.workoutTime,
                    workout.completed && styles.workoutCompleted
                  ]}>
                    {workout.time}
                  </Text>
                  <Text style={[
                    styles.workoutTitle,
                    workout.completed && styles.workoutCompleted
                  ]}>
                    {workout.title}
                  </Text>
                  <Text style={styles.workoutDuration}>{workout.duration}</Text>
                </View>

                <TouchableOpacity style={styles.optionsButton}>
                  <X size={16} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Calendar size={48} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No workouts scheduled</Text>
            <Text style={styles.emptyText}>
              Add a workout to start building your routine
            </Text>
          </View>
        )}

        {/* Suggestions */}
        <View style={styles.suggestionsSection}>
          <Text style={styles.suggestionsTitle}>Suggestions for you</Text>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity key={index} style={styles.suggestionCard}>
              <View style={[styles.suggestionIcon, { backgroundColor: `${suggestion.color}20` }]}>
                <suggestion.icon size={20} color={suggestion.color} />
              </View>
              <Text style={styles.suggestionText}>{suggestion.title}</Text>
              <Plus size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Weekly Goals */}
        <View style={styles.goalsSection}>
          <Text style={styles.goalsTitle}>This Week's Goals</Text>
          <View style={styles.goalCard}>
            <View style={styles.goalProgress}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '60%' }]} />
              </View>
              <Text style={styles.progressText}>3 of 5 workouts completed</Text>
            </View>
            <Text style={styles.goalEncouragement}>
              You're doing great! Every movement counts towards your wellness.
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
  weekContainer: {
    paddingBottom: 24,
  },
  weekScroll: {
    paddingHorizontal: 16,
  },
  dayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    alignItems: 'center',
    minWidth: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dayCardSelected: {
    backgroundColor: '#14B8A6',
  },
  dayCardToday: {
    borderWidth: 2,
    borderColor: '#14B8A6',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  dayTextSelected: {
    color: '#FFFFFF',
  },
  dayTextToday: {
    color: '#14B8A6',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  dateTextSelected: {
    color: '#FFFFFF',
  },
  dateTextToday: {
    color: '#14B8A6',
  },
  workoutDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#14B8A6',
    marginTop: 4,
  },
  workoutDotSelected: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  dayTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14B8A6',
  },
  workoutsSection: {
    marginBottom: 32,
  },
  workoutItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  checkButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  checkButtonCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14B8A6',
    marginBottom: 4,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  workoutDuration: {
    fontSize: 14,
    color: '#6B7280',
  },
  workoutCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  optionsButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 48,
    marginBottom: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  suggestionsSection: {
    marginBottom: 32,
  },
  suggestionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  suggestionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  suggestionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  suggestionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  goalsSection: {
    marginBottom: 32,
  },
  goalsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  goalProgress: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#14B8A6',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14B8A6',
  },
  goalEncouragement: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});