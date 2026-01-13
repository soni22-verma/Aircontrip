import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaPaperPlane,
    FaHeadset,
    FaCheck,
    FaArrowRight,
    FaChevronRight,
    FaWhatsapp,
    FaCommentDots
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../services/endpoint';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const [activeTab, setActiveTab] = useState('form');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const contactMethods = [
        {
            icon: <FaPhone className="text-blue-600" />,
            title: "Call Us",
            details: ["+1 (800) 123-4567", "+1 (800) 987-6543"],
            action: "Call now",
            color: "bg-blue-50"
        },
        {
            icon: <FaEnvelope className="text-green-600" />,
            title: "Email",
            details: ["support@aircontrip.com", "bookings@aircontrip.com"],
            action: "Send email",
            color: "bg-green-50"
        },
        {
            icon: <FaWhatsapp className="text-green-500" />,
            title: "WhatsApp",
            details: ["+1 (800) 555-0123"],
            action: "Chat now",
            color: "bg-green-50"
        },
        {
            icon: <FaMapMarkerAlt className="text-red-600" />,
            title: "Office",
            details: ["123 Travel Street", "New York, NY 10001"],
            action: "View map",
            color: "bg-red-50"
        }
    ];

    const faqItems = [
        {
            question: "How do I modify my booking?",
            answer: "You can modify your booking through the 'My Trips' section. Changes may be subject to fees depending on fare rules."
        },
        {
            question: "What's your cancellation policy?",
            answer: "Cancellation policies vary by ticket type. Basic fares may be non-refundable while premium fares offer flexibility."
        },
        {
            question: "How long does refund processing take?",
            answer: "Refunds typically process within 7-10 business days, depending on your payment method and bank."
        },
        {
            question: "Can I add baggage after booking?",
            answer: "Yes, you can add baggage through 'My Trips' up to 4 hours before departure."
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleContactForm = async (e) => {
        e.preventDefault();

        try {
            console.log("sdfjsdfjsjsmgjgsgmr")
             console.log(formData)

            const response = await axios.post(
                api.contact.contactus,
              {  formData}
            );

            console.log("API Response:", response);

            if (response.data.success) {
        localStorage.setItem("Authorization" , response?.data?.token)
                toast?.success(
                    "Your message has been sent successfully. We’ll get back to you soon."
                );
        localStorage.setItem("token", response.data.token);

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                });

                navigate("/");
            }
        } catch (error) {
            console.log("API Error:", error);

            toast?.error(
                error?.response?.data?.message || "Fill required fields"
            );
        }
    };

    // useEffect(() => {
    //     console.log(formData)
    // }, [formData])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 mt-15">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center mb-6">
                        <div className="bg-white/20 p-3 rounded-full mr-4">
                            <FaPaperPlane className="text-2xl" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold">Contact Aircontrip</h1>
                    </div>
                    <p className="text-xl text-blue-100 max-w-3xl">
                        We're here to help with your travel needs. Reach out to us through any channel below.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Contact Methods Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {contactMethods.map((method, index) => (
                        <div
                            key={index}
                            className={`${method.color} rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300`}
                        >
                            <div className="flex items-center mb-4">
                                <div className="bg-white p-3 rounded-xl shadow-sm mr-4">
                                    {method.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">{method.title}</h3>
                            </div>
                            <div className="space-y-2 mb-6">
                                {method.details.map((detail, idx) => (
                                    <p key={idx} className="text-gray-700">{detail}</p>
                                ))}
                            </div>
                            <button className="text-blue-600 font-medium flex items-center hover:text-blue-700">
                                {method.action}
                                <FaChevronRight className="ml-2 text-sm" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Two Column Layout */}
                <div className="lg:grid lg:grid-cols-3 gap-12">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-xl shadow-sm w-fit">
                            <button
                                onClick={() => setActiveTab('form')}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'form'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Send Message
                            </button>
                            <button
                                onClick={() => setActiveTab('chat')}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'chat'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Live Chat
                            </button>
                            <button
                                onClick={() => setActiveTab('callback')}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'callback'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Request Callback
                            </button>
                        </div>

                        {/* Form Container */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            {activeTab === 'form' && (
                                <>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Send us a message</h2>
                                    <p className="text-gray-600 mb-8">We typically respond within 2 hours</p>

                                    {isSubmitted ? (
                                        <div className="text-center py-12">
                                            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <FaCheck className="text-green-600 text-3xl" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Message Sent!</h3>
                                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                                Thank you for contacting Aircontrip. Our team will get back to you shortly.
                                            </p>
                                            <button
                                                onClick={() => setIsSubmitted(false)}
                                                className="text-blue-600 font-medium hover:text-blue-700"
                                            >
                                                Send another message
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={(e) => handleContactForm(e)} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email Address *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                        placeholder="john@example.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                        placeholder="+1 (123) 456-7890"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Subject *
                                                    </label>
                                                    <select
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                        required
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    >
                                                        <option value="">Select a subject</option>
                                                        <option value="booking Assistance">Booking Assistance</option>
                                                        <option value="changes & Cancellations">Changes & Cancellations</option>
                                                        <option value="refund Request">Refund Request</option>
                                                        <option value="technical Issue">Technical Issue</option>
                                                        <option value="feedback">Feedback</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Message *
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                                    required
                                                    rows={6}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    placeholder="Tell us how we can help you..."
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                                            >
                                                <FaPaperPlane className="mr-3" />
                                                Send Message
                                            </button>
                                        </form>
                                    )}
                                </>
                            )}

                            {activeTab === 'chat' && (
                                <div className="text-center py-12">
                                    <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FaCommentDots className="text-blue-600 text-3xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Live Chat Support</h3>
                                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                        Chat with our support team in real-time. Our average response time is under 3 minutes.
                                    </p>
                                    <div className="space-y-4">
                                        <button className="w-full bg-green-500 text-white py-4 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors">
                                            Start Chat on WhatsApp
                                        </button>
                                        <button className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                                            Start Web Chat
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-6">
                                        Available 24/7 for urgent travel inquiries
                                    </p>
                                </div>
                            )}

                            {activeTab === 'callback' && (
                                <div className="py-8">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Request a Callback</h3>
                                    <p className="text-gray-600 mb-8">We'll call you at your preferred time</p>

                                    <form className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Your Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="+1 (123) 456-7890"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Preferred Callback Time
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {['9-12 AM', '12-3 PM', '3-6 PM', '6-9 PM'].map((time, index) => (
                                                    <label key={index} className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="callbackTime"
                                                            value={time}
                                                            className="mr-2"
                                                        />
                                                        <span className="text-gray-700">{time}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Additional Notes (Optional)
                                            </label>
                                            <textarea
                                                rows={3}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="What would you like to discuss?"
                                            />
                                        </div>

                                        <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                            Request Callback
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - FAQ & Info */}
                    <div className="mt-12 lg:mt-0">
                        {/* FAQ Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Common Questions</h2>
                            <div className="space-y-6">
                                {faqItems.map((faq, index) => (
                                    <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                        <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-6 text-blue-600 font-medium flex items-center hover:text-blue-700">
                                View all FAQs
                                <FaArrowRight className="ml-2 text-sm" />
                            </button>
                        </div>

                        {/* Support Hours */}
                        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                    <FaClock className="text-blue-600 text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Support Hours</h3>
                                    <p className="text-gray-600 text-sm">We're here when you need us</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-blue-100">
                                    <span className="text-gray-700">Monday - Friday</span>
                                    <span className="font-semibold text-gray-800">8 AM - 10 PM EST</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-blue-100">
                                    <span className="text-gray-700">Saturday - Sunday</span>
                                    <span className="font-semibold text-gray-800">9 AM - 8 PM EST</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">24/7 Emergency</span>
                                    <span className="font-semibold text-blue-600">+1 (800) 911-2233</span>
                                </div>
                            </div>

                            <div className="mt-8 bg-white rounded-xl p-4 border border-blue-200">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                        <FaHeadset className="text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Premium Support</h4>
                                        <p className="text-gray-600 text-sm mt-1">
                                            Business travelers get priority support with guaranteed 15-minute response time.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>


        </div>
    );
};

export default ContactUs;