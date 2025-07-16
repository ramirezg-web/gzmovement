import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Bell, Shield, Heart, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit3, Moon, Globe, Accessibility } from 'lucide-react-native';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const profileSections = [
    {
      title: 'Personal',
      items: [
        { 
          icon: User, 
          title: 'Profile Information', 
          subtitle: 'Update your personal details',
          action: 'navigate'
        },
        { 
          icon: Edit3, 
          title: 'Accessibility Needs', 
          subtitle: 'Customize for your specific requirements',
          action: 'navigate'
        },
        { 
          icon: Heart, 
          title: 'Health Conditions', 
          subtitle: 'Help us personalize your experience',
          action: 'navigate'
        },
      ],
    },
    {
      title: 'App Settings',
      items: [
        { 
          icon: Bell, 
          title: 'Notifications', 
          subtitle: 'Gentle reminders for movement',
          action: 'toggle',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        { 
          icon: Moon, 
          title: 'Dark Mode', 
          subtitle: 'Easy on the eyes',
          action: 'toggle',
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled,
        },
        { 
          icon: Globe, 
          title: 'Language', 
          subtitle: 'English',
          action: 'navigate'
        },
        { 
          icon: Accessibility, 
          title: 'Accessibility', 
          subtitle: 'Screen reader, large text, contrast',
          action: 'navigate'
        },
      ],
    },
    {
      title: 'Support & Legal',
      items: [
        { 
          icon: HelpCircle, 
          title: 'Help & Support', 
          subtitle: 'Get assistance when you need it',
          action: 'navigate'
        },
        { 
          icon: Shield, 
          title: 'Privacy & Safety', 
          subtitle: 'Your data protection settings',
          action: 'navigate'
        },
      ],
    },
  ];

  const userStats = {
    joinDate: 'January 2024',
    totalWorkouts: 47,
    totalMinutes: 680,
    currentStreak: 8,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Jordan</Text>
            <Text style={styles.userSubtitle}>Member since {userStats.joinDate}</Text>
            <Text style={styles.userMotivation}>
              "Every movement is a victory 💪"
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.totalMinutes}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userStats.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <TouchableOpacity style={styles.menuItem}>
                    <View style={styles.menuItemLeft}>
                      <View style={styles.menuIcon}>
                        <item.icon size={20} color="#6B7280" />
                      </View>
                      <View style={styles.menuContent}>
                        <Text style={styles.menuTitle}>{item.title}</Text>
                        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.menuItemRight}>
                      {item.action === 'toggle' ? (
                        <Switch
                          value={item.value}
                          onValueChange={item.onToggle}
                          trackColor={{ false: '#E5E7EB', true: '#14B8A6' }}
                          thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                        />
                      ) : (
                        <ChevronRight size={20} color="#9CA3AF" />
                      )}
                    </View>
                  </TouchableOpacity>
                  
                  {itemIndex < section.items.length - 1 && (
                    <View style={styles.menuDivider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.signOutButton}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>GZ Movement v1.0.0</Text>
          <Text style={styles.appInfoSubtext}>
            Built with care for inclusive wellness
          </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  settingsButton: {
    padding: 8,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#14B8A6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  userMotivation: {
    fontSize: 14,
    color: '#8B5CF6',
    fontStyle: 'italic',
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuItemRight: {
    marginLeft: 12,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 68,
  },
  signOutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  appInfoText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 4,
  },
  appInfoSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});