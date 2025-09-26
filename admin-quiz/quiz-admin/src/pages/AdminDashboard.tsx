import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DashboardItem {
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
}

interface StatsCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const dashboardItems: DashboardItem[] = [
    { 
      title: "Manage Modules", 
      description: "Create learning modules", 
      icon: "📚", 
      color: "#40739e", 
      route: "/modules" 
    },
    { 
      title: "Description Management", 
      description: "Add course descriptions", 
      icon: "📝", 
      color: "#44bd32", 
      route: "/descriptions" 
    },
    { 
      title: "Quiz Builder", 
      description: "Create assessments", 
      icon: "📊", 
      color: "#e1b12c", 
      route: "/quizzes" 
    },
   
  ];

  const statsData: StatsCard[] = [
    { title: "Total Users", value: "2,543", change: "+12%", isPositive: true, icon: "👥" },
    { title: "Active Courses", value: "24", change: "+3", isPositive: true, icon: "📚" },
    { title: "Completion Rate", value: "78%", change: "-2%", isPositive: false, icon: "📊" },
    { title: "Avg. Quiz Score", value: "82%", change: "+5%", isPositive: true, icon: "✅" },
  ];

  const recentActivities = [
    { action: "New module added", subject: "Introduction to React", time: "2 hours ago" },
    { action: "Quiz completed", subject: "JavaScript Basics", time: "5 hours ago" },
    { action: "User registered", subject: "John Doe", time: "Yesterday" },
    { action: "Course updated", subject: "Advanced CSS", time: "2 days ago" },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#2f3640",
          color: "#fff",
          padding: "20px 0",
        }}
      >
       
        <div style={{ padding: "20px 0" }}>
          {["dashboard", "courses"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 20px",
                cursor: "pointer",
                backgroundColor: activeTab === tab ? "#40739e" : "transparent",
                textTransform: "capitalize",
              }}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ color: "#2f3640", margin: 0 }}>Admin Dashboard</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            
           
          </div>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {statsData.map((stat) => (
            <div
              key={stat.title}
              style={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "#7f8fa6", fontSize: "14px", marginBottom: "5px" }}>
                    {stat.title}
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: "bold", color: "#2f3640" }}>
                    {stat.value}
                  </div>
                </div>
                <div style={{ fontSize: "24px" }}>{stat.icon}</div>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  color: stat.isPositive ? "#44bd32" : "#e84118",
                }}
              >
                {stat.change} from last week
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Items */}
        <h2 style={{ color: "#2f3640", marginBottom: "20px" }}>Quick Actions</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "25px",
            marginBottom: "40px",
          }}
        >
          {dashboardItems.map((item) => (
            <div
              key={item.title}
              onClick={() => navigate(item.route)}
              style={{
                backgroundColor: item.color,
                color: "#fff",
                borderRadius: "12px",
                padding: "25px",
                cursor: "pointer",
                boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "15px" }}>
                {item.icon}
              </div>
              <h3 style={{ margin: "0 0 10px", fontSize: "20px" }}>{item.title}</h3>
              <p style={{ margin: 0, opacity: 0.9 }}>{item.description}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "25px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ color: "#2f3640", marginTop: 0 }}>Recent Activity</h2>
          <div>
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 0",
                  borderBottom: index < recentActivities.length - 1 ? "1px solid #f1f2f6" : "none",
                }}
              >
                <div>
                  <div style={{ fontWeight: "bold", color: "#2f3640" }}>
                    {activity.action}
                  </div>
                  <div style={{ color: "#7f8fa6" }}>{activity.subject}</div>
                </div>
                <div style={{ color: "#7f8fa6" }}>{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;