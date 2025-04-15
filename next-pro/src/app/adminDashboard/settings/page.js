'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    clinicName: 'Modern Medical Center',
    email: 'contact@modernmedical.com',
    phone: '(555) 123-4567',
    address: 'Amman-jordan',
    website: 'www.modernmedicalcenter.com'
  });

  const [appointmentSettings, setAppointmentSettings] = useState({
    allowOnlineBooking: true,
    minBookingNotice: 24,
    maxDaysInAdvance: 30,
    appointmentDuration: 30,
    workingHoursStart: '09:00',
    workingHoursEnd: '17:00',
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  });

  const [notificationSettings, setNotificationSettings] = useState({
    sendEmailNotifications: true,
    sendSMSNotifications: false,
    appointmentReminders: true,
    reminderTime: 24
  });

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({ ...generalSettings, [name]: value });
  };

  const handleAppointmentSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setAppointmentSettings({ ...appointmentSettings, [name]: newValue });
  };

  const handleNotificationSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setNotificationSettings({ ...notificationSettings, [name]: newValue });
  };

  const handleWorkingDaysChange = (day) => {
    const currentDays = [...appointmentSettings.workingDays];
    const index = currentDays.indexOf(day);
    
    if (index > -1) {
      currentDays.splice(index, 1);
    } else {
      currentDays.push(day);
    }
    
    setAppointmentSettings({ ...appointmentSettings, workingDays: currentDays });
  };

  const handleSaveSettings = () => {
    setSaving(true);
    
    // In a real application, send the settings to your API
    console.log('Saving settings:', {
      generalSettings,
      appointmentSettings,
      notificationSettings
    });
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  return (
    <div>
      <div className="pb-5 border-b border-[#D7E2E9] mb-5">
        <h1 className="text-2xl font-bold text-[#415A80]">Settings</h1>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-[#D7E2E9]">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('general')}
              className={`${
                activeTab === 'general'
                  ? 'border-[#415A80] text-[#415A80]'
                  : 'border-transparent text-gray-500 hover:text-[#415A80] hover:border-[#D7E2E9]'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`${
                activeTab === 'appointments'
                  ? 'border-[#415A80] text-[#415A80]'
                  : 'border-transparent text-gray-500 hover:text-[#415A80] hover:border-[#D7E2E9]'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`${
                activeTab === 'notifications'
                  ? 'border-[#415A80] text-[#415A80]'
                  : 'border-transparent text-gray-500 hover:text-[#415A80] hover:border-[#D7E2E9]'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Notifications
            </button>
          </nav>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-[#415A80]">General Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="clinicName" className="block text-sm font-medium text-[#415A80]">
                  Clinic Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="clinicName"
                    id="clinicName"
                    value={generalSettings.clinicName}
                    onChange={handleGeneralSettingsChange}
                    className="shadow-sm focus:ring-[#A5D4DC] focus:border-[#A5D4DC] block w-full sm:text-sm border-[#D7E2E9] rounded-md bg-[#E5E7E9]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#415A80]">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={generalSettings.email}
                    onChange={handleGeneralSettingsChange}
                    className="shadow-sm focus:ring-[#A5D4DC] focus:border-[#A5D4DC] block w-full sm:text-sm border-[#D7E2E9] rounded-md bg-[#E5E7E9]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#415A80]">
                  Phone
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={generalSettings.phone}
                    onChange={handleGeneralSettingsChange}
                    className="shadow-sm focus:ring-[#A5D4DC] focus:border-[#A5D4DC] block w-full sm:text-sm border-[#D7E2E9] rounded-md bg-[#E5E7E9]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-[#415A80]">
                  Website
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="website"
                    id="website"
                    value={generalSettings.website}
                    onChange={handleGeneralSettingsChange}
                    className="shadow-sm focus:ring-[#A5D4DC] focus:border-[#A5D4DC] block w-full sm:text-sm border-[#D7E2E9] rounded-md bg-[#E5E7E9]"
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-[#415A80]">
                  Address
                </label>
                <div className="mt-1">
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={generalSettings.address}
                    onChange={handleGeneralSettingsChange}
                    className="shadow-sm focus:ring-[#A5D4DC] focus:border-[#A5D4DC] block w-full sm:text-sm border-[#D7E2E9] rounded-md bg-[#E5E7E9]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointment Settings */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-[#415A80]">Appointment Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="allowOnlineBooking"
                      name="allowOnlineBooking"
                      type="checkbox"
                      checked={appointmentSettings.allowOnlineBooking}
                      onChange={handleAppointmentSettingsChange}
                      className="focus:ring-[#A5D4DC] h-4 w-4 text-[#415A80] border-[#D7E2E9] rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="allowOnlineBooking" className="font-medium text-[#415A80]">
                      Allow Online Booking
                    </label>
                    <p className="text-gray-500">Enable patients to book appointments online through your website.</p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="minBookingNotice" className="block text-sm font-medium text-[#415A80]">
                  Minimum Booking Notice (hours)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="minBookingNotice"
                    id="minBookingNotice"
                    min="0"
                    value={appointmentSettings.minBookingNotice}
                    onChange={handleAppointmentSettingsChange}
                    className="shadow-sm focus:ring-[#A5D4DC] focus:border-[#A5D4DC] block w-full sm:text-sm border-[#D7E2E9] rounded-md bg-[#E5E7E9]"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  How many hours in advance patients must book appointments.
                </p>
              </div>

              <div>
                <label htmlFor="maxDaysInAdvance" className="block text-sm font-medium text-[#415A80]">
                  Maximum Days in Advance
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="maxDaysInAdvance"
                    id="maxDaysInAdvance"
                    min="1"
                    value={appointmentSettings.maxDaysInAdvance}
                    onChange={handleAppointmentSettingsChange}
                    className="shadow-sm focus:ring-[#A5D4DC] focus:border-[#A5D4DC] block w-full sm:text-sm border-[#D7E2E9] rounded-md bg-[#E5E7E9]"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  How many days in advance patients can book appointments.
                </p>
              </div>

              <div>
                <label htmlFor="appointmentDuration" className="block text-sm font-medium text-[#415A80]">
                  Default Appointment Duration (minutes)
                </label>
                <div className="mt-1">
                  <select
                    id="appointmentDuration"
                    name="appointmentDuration"
                    value={appointmentSettings.appointmentDuration}
                    onChange={handleAppointmentSettingsChange}
                    className="shadow-sm focus:ring-[#A5D4DC] focus:border-[#A5D4DC] block w-full sm:text-sm border-[#D7E2E9] rounded-md bg-[#E5E7E9]"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="workingHoursStart" className="block text-sm font-medium text-[#415A80]">
                  Working Hours Start
                </label>
                <div className="mt-1">
                  <input
                    type="time"
                    name="workingHoursStart"
                    id="workingHoursStart"
                    value={appointmentSettings.workingHoursStart}
                    onChange={handleAppointmentSettingsChange}
                    className="shadow-sm focus:ring-[#A5D4DC] focus:border-[#A5D4DC] block w-full sm:text-sm border-[#D7E2E9] rounded-md bg-[#E5E7E9]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="workingHoursEnd" className="block text-sm font-medium text-[#415A80]">
                  Working Hours End
                </label>
                <div className="mt-1">
                  <input
                    type="time"
                    name="workingHoursEnd"
                    id="workingHoursEnd"
                    value={appointmentSettings.workingHoursEnd}
                    onChange={handleAppointmentSettingsChange}
                    className="shadow-sm focus:ring-[#A5D4DC] focus:border-[#A5D4DC] block w-full sm:text-sm border-[#D7E2E9] rounded-md bg-[#E5E7E9]"
                  />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-[#415A80]">Working Days</label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                    <div key={day} className="flex items-center">
                      <input
                        id={`day-${day}`}
                        type="checkbox"
                        checked={appointmentSettings.workingDays.includes(day)}
                        onChange={() => handleWorkingDaysChange(day)}
                        className="focus:ring-[#A5D4DC] h-4 w-4 text-[#415A80] border-[#D7E2E9] rounded"
                      />
                      <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700 capitalize">
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-[#415A80]">Notification Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="sendEmailNotifications"
                      name="sendEmailNotifications"
                      type="checkbox"
                      checked={notificationSettings.sendEmailNotifications}
                      onChange={handleNotificationSettingsChange}
                      className="focus:ring-[#A5D4DC] h-4 w-4 text-[#415A80] border-[#D7E2E9] rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="sendEmailNotifications" className="font-medium text-[#415A80]">
                      Send Email Notifications
                    </label>
                    <p className="text-gray-500">Send email notifications for appointments and other events.</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="sendSMSNotifications"
                      name="sendSMSNotifications"
                      type="checkbox"
                      checked={notificationSettings.sendSMSNotifications}
                      onChange={handleNotificationSettingsChange}
                      className="focus:ring-[#A5D4DC] h-4 w-4 text-[#415A80] border-[#D7E2E9] rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="sendSMSNotifications" className="font-medium text-[#415A80]">
                      Send SMS Notifications
                    </label>
                    <p className="text-gray-500">Send SMS notifications for appointments and other events.</p>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="appointmentReminders"
                      name="appointmentReminders"
                      type="checkbox"
                      checked={notificationSettings.appointmentReminders}
                      onChange={handleNotificationSettingsChange}
                      className="focus:ring-[#A5D4DC] h-4 w-4 text-[#415A80] border-[#D7E2E9] rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="appointmentReminders" className="font-medium text-[#415A80]">
                      Send Appointment Reminders
                    </label>
                    <p className="text-gray-500">Send reminders to patients before their scheduled appointments.</p>
                  </div>
                </div>
              </div>

              {notificationSettings.appointmentReminders && (
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="reminderTime" className="block text-sm font-medium text-[#415A80]">
                    Reminder Time (hours before appointment)
                  </label>
                  <div className="mt-1">
                    <select
                      id="reminderTime"
                      name="reminderTime"
                      value={notificationSettings.reminderTime}
                      onChange={handleNotificationSettingsChange}
                      className="shadow-sm focus:ring-[#A5D4DC] focus:border-[#A5D4DC] block w-full sm:text-sm border-[#D7E2E9] rounded-md bg-[#E5E7E9]"
                    >
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="4">4 hours</option>
                      <option value="12">12 hours</option>
                      <option value="24">24 hours</option>
                      <option value="48">48 hours</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#415A80] hover:bg-[#A5D4DC] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A5D4DC]"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}