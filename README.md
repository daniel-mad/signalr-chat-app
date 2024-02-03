# SignalR Chat Application

This is a simple chat application built with SignalR, using .NET 7 in the backend and React in the frontend.

## Features

- Real-time chat using SignalR.
- .NET 7 for the backend.
- React for the frontend.

## Getting Started

### Prerequisites

- [.NET 7](https://dotnet.microsoft.com/download/dotnet/7.0)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (for React)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/daniel-mad/signalr-chat-app.git
   cd signalr-chat-app

   ```

2. Backend setup:
   ```bash
   cd webapi
   dotnet restore
   dotnet run
   ```
3. Frontend setup:
   ```bash
   cd webapp
   yarn install
   yarn dev
   ```

### Usage

1. Open ypur browser and navigate to `http://localhost:3000`.
2. Enter your username and room.
3. Start chatting in reat-time!

### Technologies Used

- SignalR
- .NET 7
- React
