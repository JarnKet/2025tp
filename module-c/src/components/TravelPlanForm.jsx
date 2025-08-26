import { useState, useEffect } from 'react';

export default function TravelPlanForm({ plan, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    isMultiDay: false,
    date: '',
    startDate: '',
    endDate: '',
    time: '',
    description: '',
    location: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  // Load persisted form data on mount
  useEffect(() => {
    if (plan) {
      // Editing existing plan
      setFormData(plan);
      if (plan.image) {
        // Load image from localStorage if it exists
        const imageData = localStorage.getItem(`image_${plan.image}`);
        if (imageData) {
          setImagePreview(imageData);
        } else {
          // Fallback for old format where image was stored directly
          setImagePreview(plan.image);
        }
      }
    } else {
      // Creating new plan - check for persisted draft data
      const draftData = localStorage.getItem('travelPlanDraft');
      if (draftData) {
        try {
          const parsed = JSON.parse(draftData);
          setFormData(parsed);

          // Load draft image if exists
          if (parsed.image) {
            const imageData = localStorage.getItem(`image_${parsed.image}`);
            if (imageData) {
              setImagePreview(imageData);
            }
          }
        } catch (error) {
          console.error('Error loading draft data:', error);
        }
      }
    }
  }, [plan]);

  // Save form data to localStorage whenever it changes (for new plans only)
  useEffect(() => {
    if (!plan) { // Only save drafts for new plans, not when editing
      try {
        localStorage.setItem('travelPlanDraft', JSON.stringify(formData));
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    }
  }, [formData, plan]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const compressImage = (file, maxWidth = 400, quality = 0.7) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        const width = img.width * ratio;
        const height = img.height * ratio;

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 2MB before compression)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Image size must be less than 2MB'
        }));
        return;
      }

      // Create a unique filename
      const fileName = `travel_plan_${Date.now()}_${file.name}`;

      // Compress the image
      compressImage(file).then((compressedImageUrl) => {
        try {
          localStorage.setItem(`image_${fileName}`, compressedImageUrl);
          setFormData(prev => ({
            ...prev,
            image: fileName,
            imagePreview: compressedImageUrl
          }));
          setImagePreview(compressedImageUrl);

          // Clear any previous error
          if (errors.image) {
            setErrors(prev => ({
              ...prev,
              image: ''
            }));
          }
        } catch (error) {
          setErrors(prev => ({
            ...prev,
            image: 'Image too large even after compression. Please choose a smaller image.'
          }));
        }
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate dates
    if (formData.isMultiDay) {
      if (!formData.startDate) newErrors.startDate = 'Start date is required';
      if (!formData.endDate) newErrors.endDate = 'End date is required';
      if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
        newErrors.endDate = 'End date must be after start date';
      }
    } else {
      if (!formData.date) newErrors.date = 'Date is required';
    }

    // Validate other required fields
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.image) newErrors.image = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Clear draft data when successfully submitting a new plan
      if (!plan) {
        localStorage.removeItem('travelPlanDraft');
        // Also clean up draft image if it exists
        if (formData.image && !formData.image.startsWith('data:')) {
          localStorage.removeItem(`image_${formData.image}`);
        }
      }
      onSubmit(formData);
    }
  };

  const handleCancel = () => {
    // Don't clear draft data on cancel - user might want to come back to it
    onCancel();
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-bold">
        {plan ? 'Edit Travel Plan' : 'Add New Travel Plan'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Multi-day toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isMultiDay"
            name="isMultiDay"
            checked={formData.isMultiDay}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="isMultiDay" className="text-sm">Multi-day trip</label>
        </div>

        {/* Date fields */}
        {formData.isMultiDay ? (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-1 text-sm font-medium">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                min={today}
                className={`w-full px-2 py-1 border rounded text-sm ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startDate && <p className="text-xs text-red-500">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">End Date *</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                min={formData.startDate || today}
                className={`w-full px-2 py-1 border rounded text-sm ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endDate && <p className="text-xs text-red-500">{errors.endDate}</p>}
            </div>
          </div>
        ) : (
          <div>
            <label className="block mb-1 text-sm font-medium">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={today}
              className={`w-full px-2 py-1 border rounded text-sm ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
          </div>
        )}

        {/* Time */}
        <div>
          <label className="block mb-1 text-sm font-medium">Time *</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className={`w-full px-2 py-1 border rounded text-sm ${
              errors.time ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.time && <p className="text-xs text-red-500">{errors.time}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={2}
            placeholder="What do you plan to do?"
            className={`w-full px-2 py-1 border rounded text-sm ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 text-sm font-medium">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Where will this take place?"
            className={`w-full px-2 py-1 border rounded text-sm ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 text-sm font-medium">Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={`w-full px-2 py-1 border rounded text-sm ${
              errors.image ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.image && <p className="text-xs text-red-500">{errors.image}</p>}
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="object-cover w-16 h-16 mt-2 rounded" />
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-between pt-3">
          {!plan && (
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem('travelPlanDraft');
                if (formData.image && !formData.image.startsWith('data:')) {
                  localStorage.removeItem(`image_${formData.image}`);
                }
                setFormData({
                  isMultiDay: false,
                  date: '',
                  startDate: '',
                  endDate: '',
                  time: '',
                  description: '',
                  location: '',
                  image: ''
                });
                setImagePreview('');
                setErrors({});
              }}
              className="text-sm text-red-600 underline"
            >
              Clear Draft
            </button>
          )}
          <div className="flex gap-2 ml-auto">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {plan ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
