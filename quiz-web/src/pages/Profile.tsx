import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  UserIcon,
  MailIcon,
  PencilIcon,
  SaveIcon,
  XIcon,
  CheckCircleIcon,
  MapPinIcon,
  PhoneIcon,
  CalendarIcon,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";

const Profile: React.FC = () => {
  const { user } = useAuth();

  // State for profile photo URL (base64 or object URL)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    dob: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Load stored data from localStorage on mount
  useEffect(() => {
    const storedPhoto = localStorage.getItem("profilePhoto");
    const storedProfileData = localStorage.getItem("profileData");

    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }

    if (storedProfileData) {
      setProfileData(JSON.parse(storedProfileData));
    } else {
      // Initialize with user data if no stored data exists
      setProfileData({
        name: user?.name || "",
        email: user?.email || "",
        address: "123/1, Galle Road, Colombo",
        phone: "+94 77 123 4567",
        dob: "1998-05-15",
      });
    }
  }, [user]);

  // Handle profile photo selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Create preview URL
      const photoURL = URL.createObjectURL(file);
      setProfilePhoto(photoURL);

      // Convert to base64 and save to localStorage for persistence
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          localStorage.setItem("profilePhoto", reader.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile data to localStorage
    localStorage.setItem("profileData", JSON.stringify(profileData));

    setShowSuccessMessage(true);
    setIsEditMode(false);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Profile" }]} />
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>

        {showSuccessMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              <span>Your changes have been saved successfully!</span>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="text-green-700"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Photo and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-[#e5efef] rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center mb-6">
                <div
                  className="relative h-32 w-32 rounded-full overflow-hidden mb-10 border border-gray-300 cursor-pointer"
                  title="Click to change profile photo"
                >
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <UserIcon className="h-32 w-32 text-gray-500" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 text-center">
                  {profileData.name || user?.name}
                </h2>
                <p className="text-gray-600 text-center">
                  {profileData.email || user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            {/* Profile Info Form */}
            <div className="bg-[#e5efef] rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Personal Information
                </h2>
                {!isEditMode && (
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                )}
              </div>

              {isEditMode ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <div className="flex items-center">
                        <MailIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Date of Birth
                      </label>
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          value={profileData.dob}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Address
                      </label>
                      <div className="flex items-center">
                        <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={profileData.address}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsEditMode(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Full Name
                    </h3>
                    <div className="flex items-center">
                      <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-gray-900">
                        {profileData.name || user?.name}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Email
                    </h3>
                    <div className="flex items-center">
                      <MailIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-gray-900">
                        {profileData.email || user?.email}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Phone Number
                    </h3>
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-gray-900">{profileData.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Date of Birth
                    </h3>
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-gray-900">{profileData.dob}</p>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Address
                    </h3>
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <p className="text-gray-900">{profileData.address}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
