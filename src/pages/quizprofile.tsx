import { User, Mail, Building, Calendar, Settings, Bell, Shield, HelpCircle, LogOut } from "lucide-react";
import { Card } from "../components/card";
import { Button } from "../components/button";
import { Avatar, AvatarFallback } from "../components/avatar";
import { Switch } from "../components/switch";
import { Label } from "../components/label";
import { Input } from "../components/input";

export function QuizProfile() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 border-4 border-purple-100 mb-4">
                <AvatarFallback className="bg-purple-300 text-purple-900 text-3xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold mb-1">John Doe</h2>
              <p className="text-sm text-gray-500 mb-4">Quiz Creator</p>
              <Button variant="outline" size="sm" className="w-full">
                Change Photo
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Quizzes Created</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Questions</span>
                <span className="font-semibold">48</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="font-semibold">Jan 2024</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="organization">Organization (Optional)</Label>
                <Input id="organization" defaultValue="Acme Corp" className="mt-1" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Quiz Completions</p>
                  <p className="text-sm text-gray-500">Get notified when users complete your quizzes</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Weekly Summary</p>
                  <p className="text-sm text-gray-500">Receive weekly performance reports</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          {/* Account Settings */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-6">Account Settings</h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </Button>
              <div className="pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
