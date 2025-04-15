# 🖥️ System Monitor Dashboard

**System Monitor Dashboard** is a self-hosted, real-time monitoring solution designed to provide insights into critical system metrics such as CPU usage, memory consumption, disk usage, network activity, and system uptime. Built with **Node.js** and **Express.js**, this dashboard offers a lightweight, fast, and highly customizable platform for developers, system administrators, and enthusiasts looking for a comprehensive overview of their system's health.

---

## 📊 Features

- 🔍 **Real-Time System Stats**
  - Monitor key system metrics including CPU usage, memory (RAM), disk usage, network I/O, and load averages.
  
- ⏱️ **System Uptime Tracker**
  - Tracks system uptime since the last reboot, providing an overview of system longevity.

- 📡 **Live Updates**
  - Live, real-time updates via **Socket.IO**, ensuring a smooth and continuous data stream without needing page refreshes.

- 🧰 **Modular Backend**
  - Easily extendable backend architecture, making it simple to add new metrics, alerts, or other features.

- 🔒 **Self-Hosted**
  - Complete control over your data. All metrics are displayed locally on your own server, ensuring your privacy.

- 🐳 **Docker-Ready** (Optional)
  - Seamless containerized deployment using Docker for easy setup and scaling.

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript Templates)
- **Live Updates:** Socket.IO (WebSocket-based real-time communication)
- **System Metrics:** Node.js `os` module for accessing system information
- **Styling:** Bootstrap for a clean, responsive UI design

---

## 🚀 Getting Started

### Prerequisites

Before starting, make sure you have the following installed:

- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
- (Optional) **Docker** for containerized deployment

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jerry-Wemisiko/system-monitor-dashboard.git
