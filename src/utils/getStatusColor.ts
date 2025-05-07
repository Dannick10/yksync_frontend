export const getStatusColor = (status: any) => {
    switch (status) {
      case "pending":
        return "bg-blue-600"
      case "current":
        return "bg-yellow-600"
      case "finish":
        return "bg-green-600"
      default:
        return "bg-zinc-600"
    }
  }
