import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, Users, Zap, Heart, Filter, Search, Star } from 'lucide-react-native';

export default function WorkoutsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Workouts', icon: Heart },
    { id: 'programs', label: 'GZ Programs', icon: Star },
    { id: 'quick', label: 'Quick (10-15min)', icon: Clock },
    { id: 'mobility', label: 'Mobility', icon: Zap },
    { id: 'beginner', label: 'Beginner Friendly', icon: Users },
  ];

  const gzPrograms = [
    {
      id: 'strong-is-sexy',
      title: 'Strong is Sexy',
      duration: '12 weeks',
      level: 'All Levels',
      category: 'programs',
      focus: 'Full Body Strength',
      description: 'Complete transformation program building confidence and strength',
      color: '#8B5CF6',
      accessibility: 'Progressive modifications included',
      sessions: '3-4x per week',
      featured: true,
      image: require('../../assets/images/back.jpg'),
    },
    {
      id: 'thick-thighs',
      title: 'Thick Thighs Save Lives',
      duration: '6 weeks',
      level: 'Beginner to Intermediate',
      category: 'programs',
      focus: 'Lower Body & Mobility',
      description: 'Celebrate and strengthen your lower body with targeted training',
      color: '#F97316',
      accessibility: 'Chair modifications available',
      sessions: '3x per week',
      featured: true,
      image: require('../../assets/images/ttsl.png'),
    },
    {
      id: 'bringing-sexy-back',
      title: 'Bringing Sexy Back',
      duration: '8 weeks',
      level: 'Intermediate to Advanced',
      category: 'programs',
      focus: 'Pull-up Progression',
      description: 'Master the pull-up with progressive strength building',
      color: '#14B8A6',
      accessibility: 'Band-assisted options provided',
      sessions: '2-3x per week',
      featured: true,
      image: require('../assets/images/pull.png'),
    },
  ];

  const workouts = [
    {
      id: 1,
      title: 'Desk Warrior Relief',
      duration: '12 min',
      level: 'Beginner',
      category: 'quick',
      focus: 'Neck, Shoulders, Back',
      description: 'Perfect for those long office days',
      color: '#14B8A6',
      accessibility: 'Can be done seated',
      image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      title: 'Gentle Hip Mobility',
      duration: '18 min',
      level: 'All Levels',
      category: 'mobility',
      focus: 'Hips, Lower Back',
      description: 'Restore movement after sitting',
      color: '#8B5CF6',
      accessibility: 'Modifications provided',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 3,
      title: 'Morning Energy Flow',
      duration: '15 min',
      level: 'Beginner',
      category: 'quick',
      focus: 'Full Body Wake-Up',
      description: 'Start your day with intention',
      color: '#F97316',
      accessibility: 'Chair options available',
      image: require('../../assets/images/relax.png'),
    },
    {
      id: 4,
      title: 'Post-Injury Recovery',
      duration: '25 min',
      level: 'Recovery',
      category: 'mobility',
      focus: 'Gentle Rehabilitation',
      description: 'Carefully designed for healing bodies',
      color: '#06B6D4',
      accessibility: 'Extra gentle movements',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 5,
      title: 'Lunchtime Walk Guide',
      duration: '10 min',
      level: 'All Levels',
      category: 'quick',
      focus: 'Mindful Movement',
      description: 'Make the most of your break',
      color: '#10B981',
      accessibility: 'Outdoor or indoor options',
      image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 6,
      title: 'Core Stability Builder',
      duration: '20 min',
      level: 'Intermediate',
      category: 'strength',
      focus: 'Core, Balance',
      description: 'Build strength progressively',
      color: '#8B5CF6',
      accessibility: 'Modify as needed',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const allWorkouts = [...gzPrograms, ...workouts];
  
  const filteredWorkouts = selectedFilter === 'all' 
    ? allWorkouts 
    : allWorkouts.filter(workout => 
        workout.category === selectedFilter || 
        workout.level.toLowerCase().includes(selectedFilter)
      );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Workouts</Text>
        <Text style={styles.subtitle}>Choose what feels right for your body today</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <TouchableOpacity style={styles.searchBar}>
          <Search size={20} color="#9CA3AF" />
          <Text style={styles.searchPlaceholder}>Search workouts...</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterTab,
              selectedFilter === filter.id && styles.filterTabActive
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <filter.icon 
              size={18} 
              color={selectedFilter === filter.id ? '#FFFFFF' : '#6B7280'} 
            />
            <Text style={[
              styles.filterText,
              selectedFilter === filter.id && styles.filterTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Workouts List */}
      <ScrollView style={styles.workoutsList} showsVerticalScrollIndicator={false}>
        {/* Featured Programs Section */}
        {selectedFilter === 'all' && (
          <View style={styles.featuredSection}>
            <Text style={styles.featuredTitle}>GZ Signature Programs</Text>
            <Text style={styles.featuredSubtitle}>Transform your relationship with movement</Text>
          </View>
        )}
        
        {filteredWorkouts.map((workout) => (
          <TouchableOpacity key={workout.id} style={[
            styles.workoutCard,
            workout.featured && styles.featuredWorkoutCard
          ]}>
            <Image source={{ uri: workout.image }} style={styles.workoutImage} />
            {workout.featured && (
              <View style={styles.featuredBadge}>
                <Star size={12} color="#FFFFFF" />
                <Text style={styles.featuredBadgeText}>GZ Program</Text>
              </View>
            )}
            <View style={[styles.workoutHeader, { borderBottomColor: workout.color }]}>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutDescription}>{workout.description}</Text>
              </View>
              <View style={[styles.levelBadge, { backgroundColor: `${workout.color}20` }]}>
                <Text style={[styles.levelText, { color: workout.color }]}>{workout.level}</Text>
              </View>
            </View>
            
            <View style={styles.workoutDetails}>
              <View style={styles.detailRow}>
                <Clock size={16} color="#6B7280" />
                <Text style={styles.detailText}>
                  {workout.duration}{workout.sessions ? ` • ${workout.sessions}` : ''}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Zap size={16} color="#6B7280" />
                <Text style={styles.detailText}>{workout.focus}</Text>
              </View>
              <View style={styles.detailRow}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.detailText}>{workout.accessibility}</Text>
              </View>
            </View>

            <TouchableOpacity style={[styles.startButton, { backgroundColor: workout.color }]}>
              <Text style={styles.startButtonText}>
                {workout.featured ? 'Start Program' : 'Start Workout'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
  searchSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  filterContainer: {
    paddingLeft: 24,
    marginBottom: 24,
  },
  filterTab: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTabActive: {
    backgroundColor: '#14B8A6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  workoutsList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  workoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  workoutImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 12,
  },
  workoutInfo: {
    flex: 1,
    marginRight: 12,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  workoutDetails: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  startButton: {
    margin: 20,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  featuredSection: {
    marginBottom: 24,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  featuredWorkoutCard: {
    borderWidth: 2,
    borderColor: '#14B8A6',
    position: 'relative',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#14B8A6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    zIndex: 1,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});