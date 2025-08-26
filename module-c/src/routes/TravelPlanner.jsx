import { useState, useEffect, useRef } from 'react';
import TravelPlanForm from '../components/TravelPlanForm';

// Helper function to get image URL
const getImageUrl = (imageName) => {
  if (!imageName) return null;

  // Check if it's already a full data URL (backward compatibility)
  if (imageName.startsWith('data:')) {
    return imageName;
  }

  // Get from localStorage
  return localStorage.getItem(`image_${imageName}`);
};

// Helper function to clean up orphaned images
const cleanupOrphanedImages = (travelPlans) => {
  const planImageNames = travelPlans
    .filter(plan => plan.image && !plan.image.startsWith('data:'))
    .map(plan => `image_${plan.image}`);

  // Get all image keys in localStorage
  const allKeys = Object.keys(localStorage);
  const imageKeys = allKeys.filter(key => key.startsWith('image_travel_plan_'));

  // Remove orphaned images
  imageKeys.forEach(key => {
    if (!planImageNames.includes(key)) {
      localStorage.removeItem(key);
    }
  });
};

export default function TravelPlanner() {
  const [travelPlans, setTravelPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [hasDraft, setHasDraft] = useState(false);
  const scrollRef = useRef(null);

  // Check for draft data
  useEffect(() => {
    const draftData = localStorage.getItem('travelPlanDraft');
    setHasDraft(!!draftData);
  }, [showForm]); // Re-check when form state changes

  // Load UI state from localStorage
  useEffect(() => {
    const savedUIState = localStorage.getItem('travelPlannerUIState');
    if (savedUIState) {
      try {
        const uiState = JSON.parse(savedUIState);
        setShowForm(uiState.showForm || false);
        setEditingPlan(uiState.editingPlan || null);
      } catch (error) {
        console.error('Error loading UI state:', error);
      }
    }
  }, []);

  // Save UI state to localStorage whenever it changes
  useEffect(() => {
    const uiState = {
      showForm,
      editingPlan
    };
    try {
      localStorage.setItem('travelPlannerUIState', JSON.stringify(uiState));
    } catch (error) {
      console.error('Error saving UI state:', error);
    }
  }, [showForm, editingPlan]);

  // Load travel plans from localStorage on component mount
  useEffect(() => {
    const savedPlans = localStorage.getItem('travelPlans');
    if (savedPlans) {
      try {
        const plans = JSON.parse(savedPlans);
        setTravelPlans(plans);

        // Clean up orphaned images after loading
        setTimeout(() => cleanupOrphanedImages(plans), 1000);
      } catch (error) {
        console.error('Error loading travel plans:', error);
        // Reset to empty array if data is corrupted
        setTravelPlans([]);
        localStorage.removeItem('travelPlans');
      }
    }
  }, []);

  // Save travel plans to localStorage whenever plans change
  useEffect(() => {
    try {
      localStorage.setItem('travelPlans', JSON.stringify(travelPlans));
    } catch (error) {
      console.error('Error saving travel plans:', error);
      alert('Storage quota exceeded. Please try removing some old plans or using smaller images.');
    }
  }, [travelPlans]);

  // Auto-scroll to today's or future plans when component mounts
  useEffect(() => {
    if (travelPlans.length > 0 && scrollRef.current) {
      const today = new Date().toISOString().split('T')[0];
      const futureIndex = travelPlans.findIndex(plan => {
        const planDate = plan.isMultiDay ? plan.startDate : plan.date;
        return planDate >= today;
      });

      if (futureIndex !== -1) {
        const element = scrollRef.current.children[futureIndex];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, [travelPlans]);

  const handleAddPlan = (newPlan) => {
    const planWithId = {
      ...newPlan,
      id: Date.now().toString()
    };

    const updatedPlans = [...travelPlans, planWithId];
    // Sort chronologically
    updatedPlans.sort((a, b) => {
      const dateA = a.isMultiDay ? a.startDate : a.date;
      const dateB = b.isMultiDay ? b.startDate : b.date;
      return new Date(dateA) - new Date(dateB);
    });

    setTravelPlans(updatedPlans);
    setShowForm(false);
    setHasDraft(false); // Clear draft indicator
  };

  const handleEditPlan = (updatedPlan) => {
    const updatedPlans = travelPlans.map(plan =>
      plan.id === updatedPlan.id ? updatedPlan : plan
    );

    // Sort chronologically
    updatedPlans.sort((a, b) => {
      const dateA = a.isMultiDay ? a.startDate : a.date;
      const dateB = b.isMultiDay ? b.startDate : b.date;
      return new Date(dateA) - new Date(dateB);
    });

    setTravelPlans(updatedPlans);
    setEditingPlan(null);
  };

  const handleDeletePlan = (planId) => {
    // Find the plan to get its image name
    const planToDelete = travelPlans.find(plan => plan.id === planId);
    if (planToDelete && planToDelete.image && !planToDelete.image.startsWith('data:')) {
      // Remove the associated image from localStorage
      localStorage.removeItem(`image_${planToDelete.image}`);
    }

    setTravelPlans(travelPlans.filter(plan => plan.id !== planId));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section id="travel-planner">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Travel Planner</h1>
        <button
          onClick={() => setShowForm(true)}
          className={`w-10 h-10 rounded-full text-white text-lg font-bold ${
            hasDraft
              ? 'bg-orange-500 hover:bg-orange-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          +
        </button>
      </div>

      {/* Travel Plans List */}
      <div ref={scrollRef}>
        {travelPlans.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No travel plans yet. Click the + button to add your first plan!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {travelPlans.map((plan) => (
              <div key={plan.id} className="bg-white p-4 rounded border">
                <div className="flex gap-3">
                  {plan.image && (
                    <img
                      src={getImageUrl(plan.image)}
                      alt="Travel plan"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold">{plan.description}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingPlan(plan)}
                          className="text-blue-600 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePlan(plan.id)}
                          className="text-red-600 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        {plan.isMultiDay
                          ? `${formatDate(plan.startDate)} - ${formatDate(plan.endDate)}`
                          : formatDate(plan.date)
                        } at {formatTime(plan.time)}
                      </p>
                      <p>{plan.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {(showForm || editingPlan) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded max-w-md w-full max-h-[90vh] overflow-y-auto">
            <TravelPlanForm
              plan={editingPlan}
              onSubmit={editingPlan ? handleEditPlan : handleAddPlan}
              onCancel={() => {
                setShowForm(false);
                setEditingPlan(null);
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
