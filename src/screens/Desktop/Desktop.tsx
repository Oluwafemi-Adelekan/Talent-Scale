import React from "react";
import { JobListingsSection } from "./sections/JobListingsSection/JobListingsSection";
import { NavigationBarSection } from "./sections/NavigationBarSection/NavigationBarSection";
import { Link } from 'react-router-dom';
import { Button } from "../../components/ui/button";

export const Desktop = (): JSX.Element => {
  return (
    <div className="flex w-full min-h-screen bg-white px-6 overflow-hidden">
      <aside className="fixed left-6 top-9 bottom-9 w-[317px]">
        <NavigationBarSection />
      </aside>
      <main className="flex-grow pl-[341px] py-9 h-screen">
        <JobListingsSection />
        <div className="absolute top-4 right-4 flex gap-2">
          <Link to="/login">
            <Button variant="outline" className="border-[#d1d4d3]">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-[#2f583f] text-white hover:bg-[#454947]">Sign Up</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};