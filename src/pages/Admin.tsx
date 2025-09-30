import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TractorManagement from "@/components/admin/TractorManagement";
import ContactInfoManagement from "@/components/admin/ContactInfoManagement";
import QuotesManagement from "@/components/admin/QuotesManagement";
import ServiceBookingsManagement from "@/components/admin/ServiceBookingsManagement";
import HomepageManagement from "@/components/admin/HomepageManagement";
import PasswordChange from "@/components/admin/PasswordChange";
import { useAuth } from "@/contexts/AuthContext";
import { Tractor, Wrench, MessageSquare, BarChart3, LogOut, User, Home, Settings } from "lucide-react";

const Admin = () => {
  const { user, signOut } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex justify-between items-center mb-4">
              <Badge className="bg-powertrac-orange text-white">Admin Panel</Badge>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {user?.email}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={signOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-powertrac-blue mb-4">
              PowerTrac Admin Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Manage tractors, view quotes, track service bookings, and monitor real-time data.
            </p>
          </div>

          <Tabs defaultValue="homepage" className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-8">
              <TabsTrigger value="homepage" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Homepage
              </TabsTrigger>
              <TabsTrigger value="tractors" className="flex items-center gap-2">
                <Tractor className="w-4 h-4" />
                Tractors
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Contact Info
              </TabsTrigger>
              <TabsTrigger value="quotes" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Quotes
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Service Bookings
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

          <TabsContent value="homepage">
            <HomepageManagement />
          </TabsContent>

          <TabsContent value="tractors">
            <TractorManagement />
          </TabsContent>

            <TabsContent value="contact">
              <ContactInfoManagement />
            </TabsContent>

            <TabsContent value="quotes">
              <QuotesManagement />
            </TabsContent>

            <TabsContent value="services">
              <ServiceBookingsManagement />
            </TabsContent>

            <TabsContent value="settings">
              <PasswordChange />
            </TabsContent>

            <TabsContent value="analytics">
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-xl font-semibold mb-4">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Analytics and reporting features will be implemented here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;