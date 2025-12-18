import { type FC,type FormEvent, useState,type ChangeEvent } from "react";

const Editor: FC = () => {
  const [name, setName] = useState("Kaizoku oni");
  const [description, setDescription] = useState("Mada mada!!!!");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Example: send to API
    // fetch("/api/update", { method: "POST", body: formData });

    console.log("Form ready to submit:", {
      name,
      description,
      imageFile,
    });
  };

  return (
    <main>
      <fieldset>
        <legend>Edit</legend>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Image File */}
          <div>
            <label htmlFor="image">Image File:</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Preview */}
          {preview && (
            <div>
              <p>Image Preview:</p>
              <img
                src={preview}
                alt="Preview"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          )}

          {/* Submit */}
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </fieldset>
    </main>
  );
};

export default Editor;
