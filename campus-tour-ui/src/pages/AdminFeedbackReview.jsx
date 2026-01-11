import { useContext, useEffect, useState } from "react";
import { CheckCircle, Eye, MessageSquare, Trash2 } from "lucide-react";
import axios from "axios";
import { storeContext } from "../context/storeContext";
import toast from "react-hot-toast";

export default function AdminFeedbackReview() {
  // Mock feedback data - in real app, this would come from API

  const { url } = useContext(storeContext);
  const [feedbacks, setFeedbacks] = useState(
    []
    //   [
    //   {
    //     id: 1,
    //     user: 'Anonymous',
    //     email: 'student@example.com',
    //     rating: 5,
    //     message: 'Great app! Very helpful for navigating the campus.',
    //     date: '2024-01-15',
    //     status: 'pending'
    //   },
    //   {
    //     id: 2,
    //     user: 'John Doe',
    //     email: 'john.doe@campus.edu',
    //     rating: 4,
    //     message: 'Good features but could use more building details.',
    //     date: '2024-01-14',
    //     status: 'reviewed'
    //   },
    //   {
    //     id: 3,
    //     user: 'Anonymous',
    //     email: 'feedback@campus.edu',
    //     rating: 3,
    //     message: 'Map sometimes loads slowly.',
    //     date: '2024-01-13',
    //     status: 'resolved'
    //   }
    // ]
  );

  const deleteFeedback = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/feedback/${id}`
      );

      if (response.data.success) {
        toast.success("deleted");
      } else {
        toast.error("Error Upon deleting");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  const getFeedbacks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/feedback`);

      if (response.data.success) {
        setFeedbacks(response.data.data);
      } else {
        toast.error("Error fetching the Feedback");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, [feedbacks]);
  const handleStatusChange = (id, newStatus) => {
    setFeedbacks(
      feedbacks.map((fb) => (fb.id === id ? { ...fb, status: newStatus } : fb))
    );
  };


  useEffect(()=>{
    console.log(feedbacks);
  },[])
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Feedback Review
        </h1>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              All Feedback Submissions
            </h2>
            <p className="text-gray-600 mt-1">
              Review and manage user feedback
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feedbacks.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {feedback.email ? feedback.email : "Anonymous"}
                      {/* <div className="text-sm text-gray-500">
                      
                      </div> */}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < feedback.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </td> */}
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {feedback.comment}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(feedback.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          feedback.status
                        )}`}
                      >
                        {feedback.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleStatusChange(feedback.id, "reviewed")
                          }
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                          disabled={
                            feedback.status === "reviewed" ||
                            feedback.status === "resolved"
                          }
                        >
                          <Eye size={16} />
                          Review
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(feedback.id, "resolved")
                          }
                          className="text-green-600 hover:text-green-900 flex items-center gap-1"
                          disabled={feedback.status === "resolved"}
                        >
                          <CheckCircle size={16} />
                          Resolve
                        </button>

                        <button
                          onClick={() => deleteFeedback(feedback.id)}
                          className="text-green-600 hover:text-green-900 flex items-center gap-1"
                        >
                          <Trash2 className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Feedback
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {feedbacks.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pending Review
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {feedbacks.filter((f) => f.status === "pending").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {feedbacks.filter((f) => f.status === "resolved").length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
