import { db } from './firebase';
import React, { useState } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [isDorming, setIsDorming] = useState(false);
    const [dormCampus, setDormCampus] = useState('');
    const [major, setMajor] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [registeredEmail, setRegisteredEmail] = useState(null); // State to store the registered email
    const [compatibilityResult, setCompatibilityResult] = useState(null); // State to store compatibility result

    const hobbyOptions = [
        'Sports', 'Music', 'Art', 'Cooking', 'Reading', 'Traveling', 
        'Gaming', 'Photography', 'Writing', 'Hiking', 'Coding', 
        'Crafting', 'Dancing',
    ];

    const handleHobbyChange = (hobby) => {
        setHobbies((prev) =>
            prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name,
            email,
            password, 
            age: parseInt(age),
            gender,
            isDorming,
            dormCampus: isDorming ? dormCampus : null,
            major,
            hobbies,
        };

        try {
            // Check if email already exists
            const userCollection = collection(db, 'users');
            const emailQuery = query(userCollection, where('email', '==', email));
            const emailSnapshot = await getDocs(emailQuery);

            if (!emailSnapshot.empty) {
                alert('This email is already registered. Please use a different email.');
                return; // Stop the submission if email exists
            }

            // Add user to Firestore
            await addDoc(userCollection, userData);
            alert('Registration Successful!');
            setRegisteredEmail(email); // Store the registered email
            resetForm();
            await findMostCompatibleUser(userData); // Check compatibility after successful registration
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('Registration Failed. Please try again.');
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setAge('');
        setGender('');
        setIsDorming(false);
        setDormCampus('');
        setMajor('');
        setHobbies([]);
        setCompatibilityResult(null); // Reset compatibility result
    };

    const findMostCompatibleUser = async (newUser) => {
        const userCollection = collection(db, 'users');
        const userSnapshot = await getDocs(userCollection);
        
        let maxScore = 0;
        let compatibleUser = null;

        userSnapshot.forEach((doc) => {
            const user = doc.data();
            if (user.email !== newUser.email) { // Avoid comparing with self
                const score = calculateCompatibilityScore(newUser.hobbies, user.hobbies);
                if (score > maxScore) {
                    maxScore = score;
                    compatibleUser = { name: user.name, email: user.email, score };
                }
            }
        });

        if (compatibleUser) {
            setCompatibilityResult(compatibleUser);
        } else {
            alert('No compatible users found.');
        }
    };

    const calculateCompatibilityScore = (hobbiesA, hobbiesB) => {
        return hobbiesA.filter(hobby => hobbiesB.includes(hobby)).length;
    };

    const boxStyle = {
        border: '1px solid #007BFF', // Border color for the box
        borderRadius: '5px', // Rounded corners for the box
        backgroundColor: '#f8f9fa', // Light background color for the box
        padding: '20px',
        margin: '20px auto', // Center the box
        width: '80%', // Width of the box
        textAlign: 'center', // Center text inside the box
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Valid Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                </select>
                <label>
                    <input type="checkbox" checked={isDorming} onChange={() => setIsDorming(!isDorming)} />
                    Are you dorming?
                </label>
                {isDorming && (
                    <input type="text" placeholder="Dorm Campus (optional)" value={dormCampus} onChange={(e) => setDormCampus(e.target.value)} />
                )}
                <input type="text" placeholder="Major (optional)" value={major} onChange={(e) => setMajor(e.target.value)} />
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                    <h3 style={{ width: '100%' }}>Select Your Hobbies:</h3>
                    {hobbyOptions.map((hobby) => (
                        <label key={hobby} style={{ flex: '1 0 45%', margin: '10px 0' }}>
                            <input type="checkbox" checked={hobbies.includes(hobby)} onChange={() => handleHobbyChange(hobby)} />
                            {hobby}
                        </label>
                    ))}
                </div>
                <button type="submit">Register</button>
            </form>
            {registeredEmail && ( // Display the registered email if available
                <div style={boxStyle}>
                    <h3>Registered Email:</h3>
                    <p>{registeredEmail}</p>
                </div>
            )}
            {compatibilityResult && (
                <div style={boxStyle}>
                    <h3>Most Compatible User:</h3>
                    <p>Name: {compatibilityResult.name}</p>
                    <p>Email: {compatibilityResult.email}</p>
                    <p>Compatibility Score: {compatibilityResult.score}</p>
                </div>
            )}
        </div>
    );
};

export default Register;
