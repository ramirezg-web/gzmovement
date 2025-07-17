import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { supabase } from '../lib/supabase';

export default function HomeScreen() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const featuredPrograms = [
    {
      id: 1,
      title: 'Strong is Sexy',
      duration: '12 weeks',
      level: 'All Levels',
      focus: 'Full Body Strength',
      color: '#14B8A6',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      title: 'Thick Thighs Save Lives',
      duration: '6 weeks',
      level: 'Beginner+',
      focus: 'Lower Body & Mobility',
      color: '#8B5CF6',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning! 💫</Text>
          <Text style={styles.subtitle}>Every movement matters. You're doing great!</Text>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Your wellness journey is unique</Text>
          <Text style={styles.heroText}>
            Whether it's a 10-minute walk or a full workout, we're here to support your movement goals.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GZ Signature Programs</Text>
          <Text style={styles.sectionSubtitle}>Transform your relationship with movement</Text>
          
          {featuredPrograms.map((workout) => (
            <TouchableOpacity key={workout.id} style={styles.workoutCard}>
              <Image source={{ uri: workout.image }} style={styles.workoutImage} />
              <View style={styles.workoutContent}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutDuration}>{workout.duration}</Text>
                <Text style={styles.workoutLevel}>{workout.level}</Text>
                <Text style={styles.workoutFocus}>{workout.focus}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingTop: 60,
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
    marginBottom: 16,
  },
  signOutButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  signOutText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  heroCard: {
    margin: 24,
    backgroundColor: '#14B8A6',
    borderRadius: 20,
    padding: 24,
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
  workoutContent: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  workoutDuration: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  workoutLevel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  workoutFocus: {
    fontSize: 14,
    color: '#14B8A6',
    fontWeight: '500',
  },
});