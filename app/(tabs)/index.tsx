import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Star, ArrowRight, Heart, Users, Accessibility } from 'lucide-react-native';

export default function HomeScreen() {
  const featuredPrograms = [
    {
      id: 1,
      title: 'Strong is Sexy',
      duration: '12 weeks',
      level: 'All Levels',
      focus: 'Full Body Strength',
      color: '#14B8A6',
      type: 'program',
      image: Image.resolveAssetSource(require('../../assets/images/strong.JPG')).uri,
    },
    {
      id: 2,
      title: 'Thick Thighs Save Lives',
      duration: '6 weeks',
      level: 'Beginner+',
      focus: 'Lower Body & Mobility',
      color: '#8B5CF6',
      type: 'program',
      image: Image.resolveAssetSource(require('../../assets/images/stretch.jpg')).uri,
    },
    {
      id: 3,
      title: 'Bringing Sexy Back',
      duration: '8 weeks',
      level: 'Intermediate+',
      focus: 'Pull-up Mastery',
      color: '#F97316',
      type: 'program',
      image: Image.resolveAssetSource(require('../../assets/images/strong.JPG')).uri,
    },
  ];

  const quickWorkouts = [
    {
      id: 4,
      title: 'Lunch Break Mobility',
      duration: '12 min',
      level: 'Beginner Friendly',
      focus: 'Desk Relief',
      color: '#10B981',
      type: 'quick',
      image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 5,
      title: 'Morning Energy Flow',
      duration: '15 min',
      level: 'All Levels',
      focus: 'Joint Mobility',
      color: '#06B6D4',
      type: 'quick',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const features = [
    { icon: Heart, title: 'Body Positive', desc: 'Celebrating every movement' },
    { icon: Users, title: 'Inclusive Community', desc: 'Safe space for all bodies' },
    { icon: Accessibility, title: 'Adaptive Exercises', desc: 'Modified for your needs' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning! 💫</Text>
          <Text style={styles.subtitle}>Every movement matters. You're doing great!</Text>
        </View>

        {/* Hero Card */}
        <LinearGradient
          colors={['#14B8A6', '#10B981']}
          style={styles.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Your wellness journey is unique</Text>
            <Text style={styles.heroText}>
              Whether it's a 10-minute walk or a full workout, we're here to support your movement goals.
            </Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Start Moving</Text>
              <ArrowRight size={20} color="#14B8A6" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Featured Programs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GZ Signature Programs</Text>
          <Text style={styles.sectionSubtitle}>Transform your relationship with movement</Text>
          
          {featuredPrograms.map((workout) => (
            <TouchableOpacity key={workout.id} style={styles.workoutCard}>
              <Image source={{ uri: workout.image }} style={styles.workoutImage} />
              <View style={[styles.workoutColorBar, { backgroundColor: workout.color }]} />
              <View style={styles.workoutContent}>
                <View style={styles.workoutHeader}>
                  <Text style={styles.workoutTitle}>{workout.title}</Text>
                  <View style={styles.workoutMeta}>
                    <Clock size={16} color="#6B7280" />
                    <Text style={styles.workoutDuration}>{workout.duration}</Text>
                  </View>
                </View>
                <View style={styles.workoutTags}>
                  <View style={[styles.tag, { backgroundColor: `${workout.color}20` }]}>
                    <Text style={[styles.tagText, { color: workout.color }]}>{workout.level}</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{workout.focus}</Text>
                  </View>
                </View>
              </View>
              <ArrowRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Wins for Busy Days</Text>
          <Text style={styles.sectionSubtitle}>Perfect for lunch breaks or quick movement</Text>
          
          {quickWorkouts.map((workout) => (
            <TouchableOpacity key={workout.id} style={styles.workoutCard}>
              <Image source={{ uri: workout.image }} style={styles.workoutImage} />
              <View style={[styles.workoutColorBar, { backgroundColor: workout.color }]} />
              <View style={styles.workoutContent}>
                <View style={styles.workoutHeader}>
                  <Text style={styles.workoutTitle}>{workout.title}</Text>
                  <View style={styles.workoutMeta}>
                    <Clock size={16} color="#6B7280" />
                    <Text style={styles.workoutDuration}>{workout.duration}</Text>
                  </View>
                </View>
                <View style={styles.workoutTags}>
                  <View style={[styles.tag, { backgroundColor: `${workout.color}20` }]}>
                    <Text style={[styles.tagText, { color: workout.color }]}>{workout.level}</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{workout.focus}</Text>
                  </View>
                </View>
              </View>
              <ArrowRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Built with care for you</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <feature.icon size={24} color="#14B8A6" />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Daily Motivation */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationText}>
            "Progress isn't perfection. It's showing up for yourself, one movement at a time."
          </Text>
          <Text style={styles.appInfoText}>GZ Movement v1.0.0</Text>
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
    paddingTop: 16,
  },
  greeting: {
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
  heroCard: {
    margin: 24,
    marginTop: 16,
    borderRadius: 20,
    padding: 24,
  },
  heroContent: {
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  heroText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 24,
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  heroButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#14B8A6',
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  workoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  workoutImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    margin: 16,
  },
  workoutColorBar: {
    width: 4,
    height: 60,
    borderRadius: 2,
    marginRight: 12,
  },
  workoutContent: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  workoutDuration: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  workoutTags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F0FDFA',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },
  featureDesc: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  motivationCard: {
    backgroundColor: '#FFFBEB',
    margin: 24,
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    alignItems: 'center',
  },
  motivationText: {
    fontSize: 16,
    color: '#92400E',
    fontStyle: 'italic',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 12,
  },
  appInfoText: {
    fontSize: 12,
    color: '#92400E',
    fontWeight: '500',
  },
});