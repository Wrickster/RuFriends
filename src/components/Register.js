import { db } from './firebase';
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

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
            await addDoc(collection(db, 'users'), userData);
            alert('Registration Successful!');
            resetForm();
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
    };

    return (
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
            <div>
                <h3>Select Your Hobbies:</h3>
                {hobbyOptions.map((hobby) => (
                    <label key={hobby}>
                        <input type="checkbox" checked={hobbies.includes(hobby)} onChange={() => handleHobbyChange(hobby)} />
                        {hobby}
                    </label>
                ))}
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
