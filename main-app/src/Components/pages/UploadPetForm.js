import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { checkJWT } from '../../Utils/JWTAuth';
import { FaUpload, FaCheck, FaPlusSquare } from 'react-icons/fa';
import './UploadPetForm.css';

const UploadPetForm = ({ addNewPet }) => {
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  // const jwtAuth = new JWTAuth();
  var response;

  const [pet, setPet] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    color: '',
    sex: 'Male',
    images: [], // Array to store uploaded images
    size: 'Small',
    age: '',
    description: '',
  });

  const handleDropzoneClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        newImages.push(e.target.result);

        if (newImages.length === files.length) {
          setPet((prevPet) => ({
            ...prevPet,
            images: [...prevPet.images, ...newImages],
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const removeImage = (index) => {
    const updatedImages = [...pet.images];
    updatedImages.splice(index, 1);
    setPet((prevPet) => ({
      ...prevPet,
      images: updatedImages,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const capitalizedValue = capitalizeFirstLetter(value); // Capitalize the input value
    setPet((prevPet) => ({
      ...prevPet,
      [name]: capitalizedValue,
    }));
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (
      pet.name.trim() === '' ||
      pet.type.trim() === '' ||
      pet.sex.trim() === '' ||
      pet.age.trim() === '' ||
      pet.color.trim() === '' ||
      pet.images.length === 0 // Check if images array is empty
    ) {
      alert('Please fill in all required fields and upload at least one image.');
      return;
    }

    addNewPet(pet);
    setPet({
      name: '',
      type: 'Dog',
      breed: '',
      color: '',
      sex: 'Male',
      images: [],
      size: 'Small',
      age: '',
      description: '',


    });
    //fileInputRef.current.value = ''; // Clear the file input
    setShowPopup(false); // Close the popup after submission
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const dogBreeds = [
    'Affenpinscher', 'Afghan Hound', 'Airedale Terrier', 'Akita', 'Alaskan Malamute', 'American Bulldog', 'American English Coonhound', 'American Eskimo Dog', 'American Foxhound', 'American Hairless Terrier', 'American Leopard Hound', 'American Staffordshire Terrier', 'American Water Spaniel', 'Anatolian Shepherd Dog', 'Appenzeller Sennenhund', 'Australian Cattle Dog', 'Australian Kelpie', 'Australian Shepherd', 'Australian Stumpy Tail Cattle Dog', 'Australian Terrier', 'Azawakh', 'Barbet', 'Basenji', 'Basset Fauve de Bretagne', 'Basset Hound', 'Bavarian Mountain Scent Hound', 'Beagle', 'Bearded Collie', 'Beauceron', 'Bedlington Terrier', 'Belgian Laekenois', 'Belgian Malinois', 'Belgian Sheepdog', 'Belgian Tervuren', 'Bergamasco Sheepdog', 'Berger Picard', 'Bernese Mountain Dog', 'Bichon Frise', 'Biewer Terrier', 'Black and Tan Coonhound', 'Black Russian Terrier', 'Bloodhound', 'Bluetick Coonhound', 'Boerboel', 'Bohemian Shepherd', 'Bolognese', 'Border Collie', 'Border Terrier', 'Borzoi', 'Boston Terrier', 'Bouvier des Flandres', 'Boxer', 'Boykin Spaniel', 'Bracco Italiano', 'Braque du Bourbonnais', 'Braque Francais Pyrenean', 'Briard', 'Brittany', 'Broholmer', 'Brussels Griffon', 'Bull Terrier', 'Bulldog', 'Bullmastiff', 'Cairn Terrier', 'Canaan Dog', 'Cane Corso', 'Cardigan Welsh Corgi', 'Carolina Dog', 'Catahoula Leopard Dog', 'Caucasian Shepherd Dog', 'Cavalier King Charles Spaniel', 'Central Asian Shepherd Dog', 'Cesky Terrier', 'Chesapeake Bay Retriever', 'Chihuahua', 'Chinese Crested', 'Chinese Shar-Pei', 'Chinook', 'Chow Chow', 'Cirneco dell’Etna', 'Clumber Spaniel', 'Cocker Spaniel', 'Collie', 'Coton de Tulear', 'Croatian Sheepdog', 'Curly-Coated Retriever', 'Czechoslovakian Vlcak', 'Dachshund', 'Dalmatian', 'Dandie Dinmont Terrier', 'Danish-Swedish Farmdog', 'Deutscher Wachtelhund', 'Doberman Pinscher', 'Dogo Argentino', 'Dogue de Bordeaux', 'Drentsche Patrijshond', 'Drever', 'Dutch Shepherd', 'English Cocker Spaniel', 'English Foxhound', 'English Setter', 'English Springer Spaniel', 'English Toy Spaniel', 'Entlebucher Mountain Dog', 'Estrela Mountain Dog', 'Eurasier', 'Field Spaniel', 'Finnish Lapphund', 'Finnish Spitz', 'Flat-Coated Retriever', 'French Bulldog', 'French Spaniel', 'German Longhaired Pointer', 'German Pinscher', 'German Shepherd Dog', 'German Shorthaired Pointer', 'German Spitz', 'German Wirehaired Pointer', 'Giant Schnauzer', 'Glen of Imaal Terrier', 'Golden Retriever', 'Gordon Setter', 'Grand Basset Griffon Vendéen', 'Great Dane', 'Great Pyrenees', 'Greater Swiss Mountain Dog', 'Greyhound', 'Hamiltonstovare', 'Hanoverian Scenthound', 'Harrier', 'Havanese', 'Hokkaido', 'Hovawart', 'Ibizan Hound', 'Icelandic Sheepdog', 'Irish Red and White Setter', 'Irish Setter', 'Irish Terrier', 'Irish Water Spaniel', 'Irish Wolfhound', 'Italian Greyhound', 'Jagdterrier', 'Japanese Chin', 'Japanese Spitz', 'Jindo', 'Kai Ken', 'Karelian Bear Dog', 'Keeshond', 'Kerry Blue Terrier', 'Kishu Ken', 'Komondor', 'Kromfohrlander', 'Kuvasz', 'Labrador Retriever', 'Lagotto Romagnolo', 'Lakeland Terrier', 'Lancashire Heeler', 'Lapponian Herder', 'Leonberger', 'Lhasa Apso', 'Löwchen', 'Maltese', 'Manchester Terrier (Standard)', 'Manchester Terrier (Toy)', 'Mastiff', 'Miniature American Shepherd', 'Miniature Bull Terrier', 'Miniature Pinscher', 'Miniature Schnauzer', 'Mixed Breed (unknown)', 'Mountain Cur', 'Mudi', 'Neapolitan Mastiff', 'Nederlandse Kooikerhondje', 'Newfoundland', 'Norfolk Terrier', 'Norrbottenspets', 'Norwegian Buhund', 'Norwegian Elkhound', 'Norwegian Lundehund', 'Norwich Terrier', 'Nova Scotia Duck Tolling Retriever', 'Old English Sheepdog', 'Otterhound', 'Papillon', 'Parson Russell Terrier', 'Pekingese', 'Pembroke Welsh Corgi', 'Perro de Presa Canario', 'Peruvian Inca Orchid', 'Petit Basset Griffon Vendéen', 'Pharaoh Hound', 'Plott Hound', 'Pointer', 'Polish Lowland Sheepdog', 'Pomeranian', 'Poodle (Miniature)', 'Poodle (Standard)', 'Poodle (Toy)', 'Porcelaine', 'Portuguese Podengo', 'Portuguese Podengo Pequeno', 'Portuguese Pointer', 'Portuguese Sheepdog', 'Portuguese Water Dog', 'Pudelpointer', 'Pug', 'Puli', 'Pumi', 'Pyrenean Mastiff', 'Pyrenean Shepherd', 'Rafeiro do Alentejo', 'Rat Terrier', 'Redbone Coonhound', 'Rhodesian Ridgeback', 'Romanian Mioritic Shepherd Dog', 'Rottweiler', 'Russell Terrier', 'Russian Toy', 'Russian Tsvetnaya Bolonka', 'Saint Bernard', 'Saluki', 'Samoyed', 'Schapendoes', 'Schipperke', 'Scottish Deerhound', 'Scottish Terrier', 'Sealyham Terrier', 'Segugio Italiano', 'Shetland Sheepdog', 'Shiba Inu', 'Shih Tzu', 'Shikoku', 'Siberian Husky', 'Silky Terrier', 'Skye Terrier', 'Sloughi', 'Slovakian Wirehaired Pointer', 'Slovensky Cuvac', 'Slovensky Kopov', 'Small Munsterlander Pointer', 'Smooth Fox Terrier', 'Soft Coated Wheaten Terrier', 'Spanish Mastiff', 'Spanish Water Dog', 'Spinone Italiano', 'Stabyhoun', 'Staffordshire Bull Terrier', 'Standard Schnauzer', 'Sussex Spaniel', 'Swedish Lapphund', 'Swedish Vallhund', 'Taiwan Dog', 'Teddy Roosevelt Terrier', 'Thai Ridgeback', 'Tibetan Mastiff', 'Tibetan Spaniel', 'Tibetan Terrier', 'Tornjak', 'Tosa', 'Toy Fox Terrier', 'Transylvanian Hound', 'Treeing Tennessee Brindle', 'Treeing Walker Coonhound', 'Vizsla', 'Weimaraner', 'Welsh Springer Spaniel', 'Welsh Terrier', 'West Highland White Terrier', 'Wetterhoun', 'Whippet', 'Wire Fox Terrier', 'Wirehaired Pointing Griffon', 'Wirehaired Vizsla', 'Working Kelpie', 'Xoloitzcuintli', 'Yakutian Laika', 'Yorkshire Terrier'
  ];

  const catBreeds = [
    'Bengal',
    'Domestic Shorthair',
    'Maine Coon',
    'Mixed',
    'Ragdoll',
    'Siamese'
  ];

  const handleTypeChange = (event) => {
    const { value } = event.target;
    if (value === 'Dog' || value === 'Cat') {
      // Reset breed to empty if type is Dog or Cat
      setPet((prevPet) => ({
        ...prevPet,
        type: value,
        breed: '',
      }));
    } else {
      // Allow typing breed if type is other than Dog or Cat
      setPet((prevPet) => ({
        ...prevPet,
        type: value,
      }));
    }
  };

  const breedOptions = pet.type === 'Dog' ? dogBreeds : pet.type === 'Cat' ? catBreeds : [];


  return (
    <>
      <button className="upload-pet-btn" onClick={() => {
        response = checkJWT();

        response.then(function (responseResult) {
          // If the JWT is valid
          if (responseResult.ok) {
            setShowPopup(true)
          }

          // If the JWT is invalid
          else {
            // Redirect user back to login page to refresh their JWT
            alert("Your session has expired.\n\nPlease log back in to continue.");
            navigate("/login");
          }
        }
        )
      }}>
        <FaUpload className="upload-icon" />&nbsp;
        Upload a Pet
      </button>

      {showPopup && (
        <>
          <form onSubmit={handleSubmit}>

            <div className="popup">
              <div className="popup-content">
                <div className='title-buttons-row'>
                  <h2 className="upload-pet-title">Upload a Pet</h2>
                  <div className='ds-buttons'>
                    <button className="discard-button" onClick={handleClosePopup}>x Discard</button>
                    <button className="upload-button" type="submit" onClick={(event) => {
                      response = checkJWT();

                      response.then(function (responseResult) {
                        // If the JWT is valid
                        if (responseResult.ok) {
                          // handleSubmit(event);
                        }

                        // If the JWT is invalid
                        else {
                          // Redirect user back to login page to refresh their JWT
                          alert("Your session has expired.\n\nPlease log back in to continue.");
                          navigate("/login");
                        }
                      }
                      )
                    }}>
                      <FaCheck></FaCheck>&nbsp;Upload</button>
                  </div>
                </div>
                <div className="dropzone" onClick={handleDropzoneClick}>
                  <div className="dropzone-icon"><FaPlusSquare></FaPlusSquare></div>
                  <p>Drop your pet's photos or browse</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                    required
                  />
                </div>
                <div className="selected-images">
                  {pet.images.map((image, index) => (
                    <div style={{ objectFit: "contain", maxWidth: "10%", maxHeight: "10%" }} key={index} className="selected-image">
                      <img key={index} src={image} alt={`Uploaded pet image #${index}`} className="pet-image" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-image-button"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pet-details">
                  <h4>Pet Details</h4><br></br>
                  <input
                    type="text"
                    placeholder="What’s your pet’s name?"
                    name="name"
                    value={pet.name}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="pet-details-row">
                    <select
                      name="type"
                      placeholder="Pet Type"
                      value={pet.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Pet Type</option>
                      <option value="Dog">Dog</option>
                      <option value="Cat">Cat</option>
                      <option value="Bird">Bird</option>
                      <option value="Fish">Small Critter</option>
                    </select>
                    <select
                      name="sex"
                      placeholder="Pet Sex"
                      value={pet.sex}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Pet Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  {/* {pet.type === 'Dog' || pet.type === 'Cat' ? ( 
                    <select
                      name="breed"
                      placeholder="Pet Breed"
                      value={pet.breed}
                      onChange={handleInputChange}
                      
                    >
                       <option value="">Select Pet Breed</option>
                      {pet.type === 'Dog' ? (
                        dogBreeds.map((breed, index) => (
                          <option key={index} value={breed}>{breed}</option>
                        ))
                      ) : (
                        catBreeds.map((breed, index) => (
                          <option key={index} value={breed}>{breed}</option>
                        ))
                      )}
                    </select>
                  ) : ( */}
                  <div className="pet-details-row">
                    <input
                      type="text"
                      placeholder="Pet Breed"
                      name="breed"
                      value={pet.breed}
                      onChange={handleInputChange}
                      required
                    />
                    <select
                      name="size"
                      placeholder="Pet Size"
                      value={pet.size}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Pet Size</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>

                  </div>
                  <input
                    type="text"
                    placeholder="Pet Age"
                    name="age"
                    value={pet.age}
                    onChange={handleInputChange}
                    required
                  />


                  <input
                    type="text"
                    placeholder="Pet Color"
                    name="color"
                    value={pet.color}
                    onChange={handleInputChange}
                    required
                  />
                  <textarea
                    name="description"
                    placeholder="Tell us more about your pet"
                    value={pet.description}
                    onChange={handleInputChange}
                    maxLength={4096} // Set your desired maximum character limit here

                  />
                </div>

                <div className='ds-buttons'>
                  <button className="discard-button" onClick={handleClosePopup}>x Discard</button>
                  <button className="upload-button" type="submit" onClick={(event) => {
                    response = checkJWT();

                    response.then(function (responseResult) {
                      // If the JWT is valid
                      if (responseResult.ok) {
                        // handleSubmit(event);
                      }

                      // If the JWT is invalid
                      else {
                        // Redirect user back to login page to refresh their JWT
                        alert("Your session has expired.\n\nPlease log back in to continue.");
                        navigate("/login");
                      }
                    }
                    )
                  }}>
                    <FaCheck></FaCheck>&nbsp;Upload</button>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default UploadPetForm;
