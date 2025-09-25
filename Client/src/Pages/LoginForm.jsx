// import React, { useState, useEffect } from 'react';
// import { Eye, EyeOff, Lock, Mail, Shield, Wrench, AlertCircle, User } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [focusedField, setFocusedField] = useState('');
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     rememberMe: false
//   });

//   // Load remembered username on mount
//   useEffect(() => {
//     const remembered = localStorage.getItem('rememberMe');
//     const lastUsername = localStorage.getItem('lastUsername');
    
//     if (remembered === 'true' && lastUsername) {
//       setFormData(prev => ({
//         ...prev,
//         username: lastUsername,
//         rememberMe: true
//       }));
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//     // Clear error when user starts typing
//     if (error) setError('');
//   };

//   // Handle Enter key submission
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSubmit(e);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e?.preventDefault();
    
//     if (!formData.username || !formData.password) {
//       setError('Please enter both username and password');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//       // Real API call using axios
//       const response = await axios.post('/api/auth/login', {
//         username: formData.username,
//         password: formData.password
//       }, {
//         timeout: 10000, // 10 second timeout
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (response.data.success) {
//         // Handle "Remember Me" functionality
//         if (formData.rememberMe) {
//           localStorage.setItem('rememberMe', 'true');
//           localStorage.setItem('lastUsername', formData.username);
//         } else {
//           localStorage.removeItem('rememberMe');
//           localStorage.removeItem('lastUsername');
//         }
        
//         // Store authentication token if provided
//         if (response.data.token) {
//           localStorage.setItem('authToken', response.data.token);
//           // Set default authorization header for future requests
//           axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
//         }
        
//         // Redirect based on user role
//         redirectBasedOnRole(response.data.user.role);
//       } else {
//         setError(response.data.message || 'Login failed');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
      
//       if (err.code === 'ECONNABORTED') {
//         setError('Request timeout. Please try again.');
//       } else if (err.response) {
//         // Server responded with error status
//         const status = err.response.status;
//         const message = err.response.data?.message || err.response.data?.error;
        
//         switch (status) {
//           case 401:
//             setError('Invalid username or password');
//             break;
//           case 403:
//             setError('Access forbidden. Please contact administrator.');
//             break;
//           case 429:
//             setError('Too many login attempts. Please try again later.');
//             break;
//           case 500:
//             setError('Server error. Please try again later.');
//             break;
//           default:
//             setError(message || `Error: ${status}. Please try again.`);
//         }
//       } else if (err.request) {
//         // Network error
//         setError('Network error. Please check your connection and try again.');
//       } else {
//         setError('An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Role-based redirection
//   const redirectBasedOnRole = (role) => {
//     console.log('Redirecting user with role:', role);
    
//     switch (role?.toLowerCase()) {
//       case 'admin':
//         navigate('/admin/dashboard');
//         break;
//       case 'manager':
//         navigate('/manager/dashboard');
//         break;
//       case 'technician':
//         navigate('/technician/dashboard');
//         break;
//       case 'operator':
//         navigate('/operator/dashboard');
//         break;
//       default:
//         navigate('/dashboard');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
//       {/* Background - You can replace this with your uploaded image */}
//       <div 
//         className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-teal-50"
//         style={{
//           backgroundImage: 'url("/images/bg_video.gif")', 
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat'
//         }}
//       />
      
//       {/* Overlay for better contrast */}
//       <div className="absolute inset-0 bg-black/20"></div>
      
//       {/* Subtle background pattern */}
//       <div className="absolute inset-0 opacity-5">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-32 h-32 border-2 border-blue-200 rounded-full animate-pulse"
//             style={{
//               left: `${(i % 5) * 25}%`,
//               top: `${Math.floor(i / 5) * 30}%`,
//               animationDelay: `${i * 0.3}s`,
//             }}
//           />
//         ))}
//       </div>
      
//       {/* Login Form Container */}
//       <div className="relative z-10 w-full max-w-md mx-4">
//         {/* Glass morphism card */}
//         <div className="bg-white/85 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-8 transform transition-all duration-500 hover:shadow-3xl">
          
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full mb-4 shadow-lg transform transition-all duration-300 hover:scale-110">
//               <Wrench className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">MaintenancePro</h1>
//             <p className="text-gray-600 text-sm">Preventive Maintenance Management System</p>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-pulse">
//               <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
//               <p className="text-red-700 text-sm">{error}</p>
//             </div>
//           )}

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Username Input */}
//             <div className="relative group">
//               <div
//                 className={`absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
//                   focusedField === 'username' ? 'opacity-100' : ''
//                 }`}
//               />
//               <div className="relative">
//                 <label htmlFor="username" className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
//                   <User className="w-4 h-4 text-blue-600" />
//                   Username
//                 </label>
//                 <div className="relative">
//                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
//                     <User className={`w-5 h-5 text-gray-400 transition-all duration-300 ${
//                       focusedField === 'username' ? 'text-blue-800 scale-110' : ''
//                     }`} />
//                   </div>
//                   <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleInputChange}
//                     onFocus={() => setFocusedField('username')}
//                     onBlur={() => setFocusedField('')}
//                     onKeyPress={handleKeyPress}
//                     className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                     placeholder="Enter your username"
//                     disabled={isLoading}
//                     required
//                     autoComplete="username"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Password Input */}
//             <div className="relative group">
//               <div
//                 className={`absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
//                   focusedField === 'password' ? 'opacity-100' : ''
//                 }`}
//               />
//               <div className="relative">
//                 <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
//                   <Lock className="w-4 h-4 text-blue-600" />
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
//                     <Lock className={`w-5 h-5 text-gray-400 transition-all duration-300 ${
//                       focusedField === 'password' ? 'text-blue-800 scale-110' : ''
//                     }`} />
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     onFocus={() => setFocusedField('password')}
//                     onBlur={() => setFocusedField('')}
//                     onKeyPress={handleKeyPress}
//                     className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                     placeholder="Enter your password"
//                     disabled={isLoading}
//                     required
//                     autoComplete="current-password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     disabled={isLoading}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Remember Me */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center cursor-pointer group">
//                 <div className="relative">
//                   <input
//                     type="checkbox"
//                     name="rememberMe"
//                     checked={formData.rememberMe}
//                     onChange={handleInputChange}
//                     disabled={isLoading}
//                     className="sr-only"
//                   />
//                   <div
//                     className={`w-5 h-5 border-2 border-gray-300 rounded transition-all duration-300 flex items-center justify-center ${
//                       formData.rememberMe
//                         ? 'bg-blue-500 border-blue-500'
//                         : 'hover:border-blue-400'
//                     } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   >
//                     {formData.rememberMe && (
//                       <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                     )}
//                   </div>
//                 </div>
//                 <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
//                   Remember me
//                 </span>
//               </label>
              
//               <a 
//                 href="#" 
//                 className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   // Handle forgot password logic here
//                   alert('Forgot password functionality to be implemented');
//                 }}
//               >
//                 Forgot password?
//               </a>
//             </div>

//             {/* Login Button */}
//             <button
//               type="submit"
//               disabled={isLoading || !formData.username || !formData.password}
//               className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-teal-700 focus:ring-4 focus:ring-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg group relative overflow-hidden"
//             >
//               {/* Button shine effect */}
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
//               <div className="relative flex items-center justify-center">
//                 {isLoading ? (
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                     Signing in...
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center gap-2">
//                     <Shield className="w-4 h-4" />
//                     Sign In
//                   </div>
//                 )}
//               </div>
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="mt-8 pt-6 border-t border-gray-200">
//             <p className="text-center text-sm text-gray-600">
//               Need access to the system?{' '}
//               <a 
//                 href="#" 
//                 className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   // Handle contact admin logic here
//                   alert('Contact administrator functionality to be implemented');
//                 }}
//               >
//                 Contact Administrator
//               </a>
//             </p>
//           </div>

//           {/* Security Badge */}
//           <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
//             <Shield className="w-3 h-3" />
//             <span>Secure SSL Connection</span>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-6 text-sm text-gray-600/80">
//           <p>© 2025 MaintenancePro. All rights reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;




import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Shield, Wrench, AlertCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { user, login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      redirectBasedOnRole(user.role);
    }
  }, [user, loading, navigate]);

  // Load remembered username on mount
  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe');
    const lastUsername = localStorage.getItem('lastUsername');
    
    if (remembered === 'true' && lastUsername) {
      setUsername(lastUsername);
      setRememberMe(true);
    }
  }, []);

  const redirectBasedOnRole = (role) => {
    switch (role) {
      case 'technician':
      case 'operator':
      case 'maintenance_user':
        // Maintenance users go to their work order forms
        navigate('/work-orders');
        break;
      case 'supervisor':
      case 'maintenance_supervisor':
        // Supervisors go to management dashboard
        navigate('/supervisor-dashboard');
        break;
      case 'manager':
      case 'maintenance_manager':
        // Managers go to analytics dashboard
        navigate('/manager-dashboard');
        break;
      case 'admin':
      case 'maintenance_admin':
      case 'admin':
        // Admins go to main dashboard
        navigate('/');
        break;
      default:
        navigate('/');
    }
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLogging(true);
    setError('');

    try {
      const result = await login(username, password);
      
      if (result.success) {
        // Handle "Remember Me" functionality
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('lastUsername', username);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('lastUsername');
        }
        
        redirectBasedOnRole(result.user.role);
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLogging(false);
    }
  };

  // Handle Enter key submission
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-teal-50"
        style={{
          backgroundImage: 'url("/images/bg_video.gif")', 
          backgroundSize: 'screen',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 border-2 border-blue-200 rounded-full animate-pulse"
            style={{
              left: `${(i % 5) * 25}%`,
              top: `${Math.floor(i / 5) * 30}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
      
      {/* Login Form Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Glass morphism card */}
        <div className="bg-white/85 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 p-8 transform transition-all duration-500 hover:shadow-3xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full mb-4 shadow-lg transform transition-all duration-300 hover:scale-110">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">MaintenancePro</h1>
            <p className="text-gray-600 text-sm">Preventive Maintenance Management System</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3 animate-pulse">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Input */}
            <div className="relative group">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                  focusedField === 'username' ? 'opacity-100' : ''
                }`}
              />
              <div className="relative">
                <label htmlFor="username" className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  Username
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <User className={`w-5 h-5 text-gray-400 transition-all duration-300 ${
                      focusedField === 'username' ? 'text-blue-800 scale-110' : ''
                    }`} />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField('')}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your username"
                    disabled={isLogging}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                  focusedField === 'password' ? 'opacity-100' : ''
                }`}
              />
              <div className="relative">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Lock className={`w-5 h-5 text-gray-400 transition-all duration-300 ${
                      focusedField === 'password' ? 'text-blue-800 scale-110' : ''
                    }`} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter your password"
                    disabled={isLogging}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLogging}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLogging}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 border-2 border-gray-300 rounded transition-all duration-300 flex items-center justify-center ${
                      rememberMe
                        ? 'bg-blue-500 border-blue-500'
                        : 'hover:border-blue-400'
                    } ${isLogging ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {rememberMe && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                  Remember me
                </span>
              </label>
              
              <a 
                href="#" 
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle forgot password logic here
                  alert('Forgot password functionality to be implemented');
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLogging || !username || !password}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-teal-700 focus:ring-4 focus:ring-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg group relative overflow-hidden"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative flex items-center justify-center">
                {isLogging ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    Sign In
                  </div>
                )}
              </div>
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Need access to the system?{' '}
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle contact admin logic here
                  alert('Contact administrator functionality to be implemented');
                }}
              >
                Contact Administrator
              </a>
            </p>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <Shield className="w-3 h-3" />
            <span>Secure SSL Connection</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600/80">
          <p>© 2025 MaintenancePro. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;