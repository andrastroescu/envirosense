import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserRankings = ({ userId }) => {
    const [users, setUsers] = useState([]);
    const [avatars, setAvatars] = useState({});
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:7000/crud/users-rankings');
                setUsers(response.data);

                // Initialize avatars
                const initialAvatars = response.data.reduce((acc, user) => {
                    acc[user.id] = getRandomAvatar();
                    return acc;
                }, {});
                setAvatars(initialAvatars);
            } catch (error) {
                console.error('Error fetching user rankings:', error);
            }
        };

        fetchUsers();
    }, []);

    const inviteFriend = async () => {
        try {
            const response = await axios.post('http://localhost:7000/crud/invite-friend', { email });
            console.log('Invite sent:', response.data);
        } catch (error) {
            console.error('Error sending invite:', error);
        }
    };

    const getRandomAvatar = () => `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;

    const maxEnvironmentalImpact = users.length ? Math.max(...users.map(user => user.EnvironmentalImpact)) : 1;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '', textAlign: 'center' }}>
            <h4 style={{ textAlign: 'center', margin: '20px' }}>Ranking</h4>
            <p style={{ fontWeight: 'normal' }}> Environmental Impact</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {users.map((user) => (
                    <li
                        key={user.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '20px',
                            border: user.id === userId ? '2px solid green' : '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '10px'
                        }}
                    >
                        <img
                            src={avatars[user.id]}
                            alt="avatar"
                            style={{
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                marginRight: '20px'
                            }}
                        />
                        <div style={{ flex: 1, textAlign: 'left' }}>
                            <strong>{user.username}</strong>
                            <div
                                style={{
                                    background: '#f3f3f3',
                                    borderRadius: '5px',
                                    overflow: 'hidden',
                                    marginTop: '5px',
                                    position: 'relative',
                                    height: '20px'
                                }}
                            >
                                <div
                                    style={{
                                        width: `${(user.EnvironmentalImpact / maxEnvironmentalImpact) * 100}%`,
                                        background: '#4caf50',
                                        height: '100%'
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{ marginLeft: '10px' }}>
                            {user.EnvironmentalImpact}
                        </div>
                    </li>
                ))}
            </ul>
            <div style={{ marginTop: '40px' }}>
                <h5>Invite a Friend</h5>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter friend's email"
                    style={{
                        padding: '10px',
                        width: '80%',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ddd'
                    }}
                />
                <br />
                <button
                    onClick={inviteFriend}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '5px',
                        border: 'none',
                        background: '#4caf50',
                        color: 'white'
                    }}
                >
                    Send Invite
                </button>
            </div>
        </div>
    );
};

export default UserRankings;
