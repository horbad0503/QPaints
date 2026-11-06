"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { useSession } from "@/lib/auth";
import toast from "react-hot-toast";
import { User, Lock, Package, LogOut, Check, MapPin, AlignLeft, Camera, Bell } from "lucide-react";
import { formatNaira } from "@/lib/format";

export default function AccountPage() {
  const router = useRouter();
  const { session, refresh, logout } = useSession();
  const [activeTab, setActiveTab] = useState<"profile" | "password" | "orders" | "notifications">("profile");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState({ 
    full_name: "", email: "", phone: "", username: "", 
    address: "", city: "", state: "", bio: "", profile_picture: ""
  });
  const [passwords, setPasswords] = useState({ current_password: "", new_password: "" });
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const fields = [profile.full_name, profile.email, profile.phone, profile.address, profile.bio];
  const completedFields = fields.filter(f => f && f.trim() !== "").length;
  const completionPercentage = Math.round((completedFields / fields.length) * 100);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "notifications") setActiveTab("notifications");
    else if (tab === "orders") setActiveTab("orders");
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const [profRes, ordersRes] = await Promise.all([
          api<{ user: any }>("auth/profile"),
          api<{ orders: any[] }>("orders/list")
        ]);
        setProfile({
          full_name: profRes.user.full_name || "",
          email: profRes.user.email || "",
          phone: profRes.user.phone || "",
          username: profRes.user.username || "",
          address: profRes.user.address || "",
          city: profRes.user.city || "",
          state: profRes.user.state || "",
          bio: profRes.user.bio || "",
          profile_picture: profRes.user.profile_picture || ""
        });
        setOrders(ordersRes.orders);
      } catch (err: any) {
        if (err.status === 401) router.push("/login");
        else toast.error("Failed to load account data");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api("auth/update_profile", { method: "POST", body: profile });
      toast.success("Profile updated!");
      refresh(); 
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api("auth/change_password", { method: "POST", body: passwords });
      toast.success("Password changed!");
      setPasswords({ current_password: "", new_password: "" });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    setIsUploading(true);

    try {
      const res = await fetch("/api/php/auth/upload_avatar", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setProfile(prev => ({ ...prev, profile_picture: data.profile_picture }));
      toast.success("Profile picture updated!");
      refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) return <div className="container-shop py-20 text-center font-bold text-sm md:text-base">Loading account...</div>;

  return (
    <div className="bg-[#f9fafb] min-h-screen py-6 md:py-12">
      <div className="container-shop max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-2 md:p-4 sticky top-24">
              <h2 className="hidden lg:block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-4">Profile Settings</h2>
              <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                <button onClick={() => setActiveTab("profile")} className={`flex items-center gap-3 rounded-lg px-4 py-2.5 md:py-3 text-xs md:text-sm font-bold whitespace-nowrap transition ${activeTab === 'profile' ? 'bg-brand/5 text-brand' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <User size={16} /> Profile
                </button>
                <button onClick={() => setActiveTab("password")} className={`flex items-center gap-3 rounded-lg px-4 py-2.5 md:py-3 text-xs md:text-sm font-bold whitespace-nowrap transition ${activeTab === 'password' ? 'bg-brand/5 text-brand' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Lock size={16} /> Security
                </button>
                <button onClick={() => setActiveTab("orders")} className={`flex items-center gap-3 rounded-lg px-4 py-2.5 md:py-3 text-xs md:text-sm font-bold whitespace-nowrap transition ${activeTab === 'orders' ? 'bg-brand/5 text-brand' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Package size={16} /> Orders
                </button>
                <button onClick={() => setActiveTab("notifications")} className={`flex items-center gap-3 rounded-lg px-4 py-2.5 md:py-3 text-xs md:text-sm font-bold whitespace-nowrap transition ${activeTab === 'notifications' ? 'bg-brand/5 text-brand' : 'text-gray-600 hover:bg-gray-50'}`}>
                  <Bell size={16} /> Notifications
                </button>
                <div className="hidden lg:block h-px bg-gray-100 my-2"></div>
                <button onClick={logout} className="flex items-center gap-3 rounded-lg px-4 py-2.5 md:py-3 text-xs md:text-sm font-bold text-red-500 whitespace-nowrap transition hover:bg-red-50">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-5 md:p-8 shadow-sm">
              
              {activeTab === "profile" && (
                <form onSubmit={handleUpdateProfile} className="space-y-8">
                  
                  {/* Avatar Section */}
                  <div className="flex flex-col md:flex-row items-center gap-6 border-b border-gray-100 pb-8">
                    <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-md overflow-hidden">
                      {isUploading ? (
                        <div className="animate-pulse flex h-full w-full items-center justify-center bg-gray-300 text-gray-500 text-sm">...</div>
                      ) : profile.profile_picture ? (
                        <img src={profile.profile_picture} alt="Avatar" className="h-full w-full object-cover" />
                      ) : (
                        profile.full_name ? profile.full_name.charAt(0).toUpperCase() : "U"
                      )}
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleAvatarUpload} 
                        accept="image/jpeg, image/png, image/webp" 
                        className="hidden" 
                      />
                      <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()} 
                        className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md text-gray-600 hover:text-brand z-10"
                        disabled={isUploading}
                      >
                        <Camera size={16} />
                      </button>
                    </div>
                    <div className="text-center md:text-left">
                      <h2 className="text-lg font-bold text-black">Upload new photo</h2>
                      <p className="text-xs text-gray-500 mt-1">At least 800x800 px recommended.<br/>JPG or PNG is allowed</p>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div>
                    <h3 className="text-sm font-bold text-black flex items-center gap-2 mb-4"><User size={16} /> Personal Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-1">Full Name</label>
                        <input type="text" required value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-brand outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-1">Email</label>
                        <input type="email" required value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-brand outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-1">Phone</label>
                        <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-brand outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-1">Username (Locked)</label>
                        <input type="text" disabled value={profile.username} className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-500 cursor-not-allowed" />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <h3 className="text-sm font-bold text-black flex items-center gap-2 mb-4"><MapPin size={16} /> Location</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-1">
                        <label className="block text-[10px] font-bold text-gray-500 mb-1">Address</label>
                        <input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-brand outline-none" placeholder="123 Main St" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-1">City</label>
                        <input type="text" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-brand outline-none" placeholder="Lagos" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 mb-1">State</label>
                        <input type="text" value={profile.state} onChange={(e) => setProfile({ ...profile, state: e.target.value })} className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-brand outline-none" placeholder="Lagos State" />
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h3 className="text-sm font-bold text-black flex items-center gap-2 mb-4"><AlignLeft size={16} /> Bio</h3>
                    <textarea rows={4} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-brand outline-none" placeholder="Tell us a little about yourself..."></textarea>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button type="submit" className="rounded-lg bg-brand px-6 py-2.5 font-nexa text-sm font-bold text-white transition hover:bg-brand-dark">
                      Save Changes
                    </button>
                  </div>
                </form>
              )}

              {activeTab === "password" && (
                <div>
                  <h2 className="text-lg font-nexa font-bold text-black mb-6">Change Password</h2>
                  <form onSubmit={handleChangePassword} className="space-y-5 max-w-md">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Current Password</label>
                      <input type="password" required value={passwords.current_password} onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })} className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-brand outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">New Password</label>
                      <input type="password" required value={passwords.new_password} onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })} className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:border-brand outline-none" />
                      <p className="text-[10px] text-gray-400 mt-1">Must be at least 6 characters.</p>
                    </div>
                    <button type="submit" className="rounded-lg bg-brand px-6 py-2.5 font-nexa text-sm font-bold text-white transition hover:bg-brand-dark">
                      Update Password
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-lg font-nexa font-bold text-black mb-6">Notifications</h2>
                  <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <Bell size={40} className="mx-auto text-gray-300 mb-3" />
                    <h3 className="text-sm font-bold text-gray-800 mb-1">No new notifications</h3>
                    <p className="text-xs text-gray-500">When you get updates on your orders or account, they will appear here.</p>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h2 className="text-lg font-nexa font-bold text-black mb-6">Order History</h2>
                  {orders.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-xl">
                      <Package size={40} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-sm text-gray-500 mb-4">You haven't placed any orders yet.</p>
                      <Link href="/products" className="inline-block rounded bg-brand px-6 py-2.5 text-xs font-bold text-white transition hover:bg-brand-dark">Start Shopping</Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map(order => (
                        <Link key={order.id} href={`/orders/${order.id}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-brand/30 hover:bg-gray-50">
                          <div>
                            <p className="font-bold text-sm text-black">Ref: {order.reference}</p>
                            <p className="text-xs text-gray-500 mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                            <p className="font-black text-sm text-black">{formatNaira(order.total_amount)}</p>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.status}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Right Sidebar - Profile Completion */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-xl md:rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
              <h3 className="text-sm font-bold text-black mb-6">Complete your profile</h3>
              
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="#1B50C1" strokeWidth="8" fill="none" strokeDasharray={`${2 * Math.PI * 40}`} strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPercentage / 100)}`} className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-brand">{completionPercentage}%</span>
                </div>
              </div>

              <div className="space-y-3">
                <ProfileCheckItem label="Personal Info" checked={!!profile.full_name && !!profile.email} />
                <ProfileCheckItem label="Phone Number" checked={!!profile.phone} />
                <ProfileCheckItem label="Location" checked={!!profile.address} />
                <ProfileCheckItem label="Bio" checked={!!profile.bio} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function ProfileCheckItem({ label, checked }: { label: string, checked: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className={`font-medium ${checked ? 'text-black' : 'text-gray-500'}`}>{label}</span>
      <div className={`flex h-5 w-5 items-center justify-center rounded-full ${checked ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-300'}`}>
        <Check size={12} strokeWidth={3} />
      </div>
    </div>
  );
}