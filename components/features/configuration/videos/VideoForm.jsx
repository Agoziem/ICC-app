import VideoUploader from "@/components/custom/Fileuploader/VideoUploader";
import ImageUploader from "@/components/custom/Imageuploader/ImageUploader";
import { useCategoriesContext } from "@/data/categories/Categoriescontext";
import { useSubCategoriesContext } from "@/data/categories/Subcategoriescontext";
import React, { useEffect, useState } from "react";
// {
  //     "id": 4,
  //     "organization": {
  //       "id": 1,
  //       "name": "Innovations Cybercafe"
  //     },
  //     "thumbnail": null,
  //     "video": null,
  //     "video_url": null,
  //     "video_name": null,
  //     "img_url": null,
  //     "img_name": null,
  //     "category": {
  //       "id": 2,
  //       "category": "PostUTME",
  //       "description": "This is a Postutme Video"
  //     },
  //     "subcategory": {
  //       "id": 4,
  //       "category": {
  //         "id": 2,
  //         "category": "PostUTME",
  //         "description": "This is a Postutme Video"
  //       },
  //       "subcategory": "Physical Science"
  //     },
  //     "title": "Physical Science PostUtme intro",
  //     "description": "This is a Physical Science Introduction Video",
  //     "price": "3000.00",
  //     "video_token": "a8b535f14e1f429bbc7705f710b82ef1",
  //     "created_at": "2024-07-17T00:12:14.532976Z",
  //     "updated_at": "2024-07-17T00:12:14.532976Z",
  //     "free": false,
  //     "userIDs_that_bought_this_video": []
  //   },
const VideoForm = ({
  video,
  setVideo,
  handleSubmit,
  addorupdate,
  categories,
}) => {
  const { videoCategories } = useCategoriesContext();
  const { fetchVideoSubCategories } = useSubCategoriesContext();
  const [subcategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch subcategories when the service's category changes or on initial load if there's already a category
  useEffect(() => {
    const fetchInitialSubCategories = async () => {
      if (video.category) {
        setLoading(true);
        const data = await fetchVideoSubCategories(video.category.id);
        setSubCategories(data);
        setLoading(false);
      }
    };
    fetchInitialSubCategories();
  }, [video.category]);

  // Handle category change
  const handleCategoryChange = async (e) => {
    const selectedCategory = videoCategories.find(
      (category) => category.category === e.target.value
    );
    setVideo({ ...video, category: selectedCategory });
    setLoading(true);
    const data = await fetchVideoSubCategories(selectedCategory.id);
    setSubCategories(data);
    setLoading(false);
  };

  // Handle subcategory change
  const handleSubCategoryChange = (e) => {
    const selectedSubCategory = subcategories.find(
      (subcategory) => subcategory.subcategory === e.target.value
    );
    setVideo({ ...video, subcategory: selectedSubCategory });
  };
  return (
    <div className="p-3">
      <h5 className="text-center mb-4">
        {addorupdate.mode === "add" ? "Add Video" : `Edit ${video.title}`}
      </h5>
      <hr />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mb-2">
          <ImageUploader
            imagekey={"thumbnail"}
            imageurlkey={"img_url"}
            imagename={"img_name"}
            formData={video}
            setFormData={setVideo}
          />
        </div>

        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={video.title}
            onChange={(e) => setVideo({ ...video, title: e.target.value })}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={video.description}
            onChange={(e) =>
              setVideo({ ...video, description: e.target.value })
            }
            rows="4"
            required
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={video.price}
            onChange={(e) => setVideo({ ...video, price: e.target.value })}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={video.category?.category}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div className="mb-3">
          <label htmlFor="subcategory" className="form-label">
            Subcategory
          </label>
          <select
            className="form-select"
            id="subcategory"
            name="subcategory"
            value={video.subcategory?.subcategory}
            onChange={handleSubCategoryChange}
            required
          >
            <option value="">Select subcategory</option>
            {loading ? (
              <option>Loading...</option>
            ) : (
              subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.subcategory}>
                  {subcategory.subcategory}
                </option>
              ))
            )}
          </select>
        </div>

        {/* free */}
        <div className="mb-3">
          <label htmlFor="free" className="form-label me-2">
            Free
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="free"
            name="free"
            checked={video.free}
            onChange={(e) => setVideo({ ...video, free: e.target.checked })}
          />
        </div>

        {/* Video */}
        <div className="mb-3">
        <VideoUploader
          videokey={"video"}
          videourlkey={"video_url"}
          videoname={"video_name"}
          formData={video}
          setFormData={setVideo}
        />
        </div>

        <button type="submit" className="btn btn-primary rounded px-5 mt-3">
          {addorupdate.mode === "add" ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default VideoForm;
