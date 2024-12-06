import React from 'react';
import { useParams } from 'react-router-dom';
import StylistOverview from './StylistOverview';
import StylistClientList from './StylistClientList';
import StylistSchedule from './StylistSchedule';
import StylistRevenue from './StylistRevenue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';

const StylistPortal: React.FC = () => {
  const { stylistName } = useParams<{ stylistName: string }>();

  if (!stylistName) {
    return <div>Stylist not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-glamour-dark">
        Welcome, {stylistName}
      </h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <StylistOverview stylistName={stylistName} />
        </TabsContent>

        <TabsContent value="clients">
          <StylistClientList stylistName={stylistName} />
        </TabsContent>

        <TabsContent value="schedule">
          <StylistSchedule stylistName={stylistName} />
        </TabsContent>

        <TabsContent value="revenue">
          <StylistRevenue stylistName={stylistName} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StylistPortal;