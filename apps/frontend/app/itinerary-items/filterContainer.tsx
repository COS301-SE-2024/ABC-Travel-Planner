"use client";
import { useEffect, useRef, useState } from 'react';
import { FaHotel, FaPlane, FaCar, FaBinoculars, FaTaxi, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Select from 'react-select'
import DatePicker from 'react-datepicker';

interface aitaCodes {
    id: number, code: string
}

const FilterContainer = () => {
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [openCalender, setOpenCalender] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [selectedDates, setSelectedDates] = useState<Date[]>([])

    const handleTopicSelect = (topic: string) => {
        setSelectedTopic(topic);
        setSearchResults([]);
    };
    // const id = 25;//sample 
    const id = localStorage.getItem('id') as string
    const location: any = JSON.parse(localStorage.getItem('location') || '{}').location;
    const actualId = JSON.parse(id).id
    //console.log(actualId)

    const handleSearch = async () => {
        router.push(`/filter?id=${actualId}&topic=${selectedTopic}&term=${searchInputRef.current?.value}`);
    };

    // TODO use api that retrieves codes...
    const options = [
        {value: 'DUR', label: 'Durban'},
        {value: 'JHB', label: 'Johannesburg'},
        {value: 'CPT', label: 'Cape Town'},
        {value: 'MUC', label: 'Muchanes'}
    ]

    // TODO Display info in a seperate page? Or just use a modified filter page?
    // TODO Frontend for filter page...
    
    return (
        <div style={{maxHeight: '1000px', height: '100%', maxWidth: '1050px'}}>
        <div  style={{alignContent:'center' ,height: '100%', maxHeight:'500px', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: 'white' }}>
            <h1  style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px', color: '#333' }}>Search at your Convenience!</h1>
            <p  style={{ fontSize: '1.25rem', textAlign: 'center', marginBottom: '25px', color: '#666' }}>Click on an icon below to filter your search and provide better results</p>
    
            <div  style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '25px' }}>
                <button
                    className={`search-button ${selectedTopic === 'Flights' ? 'search-button-selected' : ''}`}
                    onClick={() => handleTopicSelect('Flights')}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'Flights' ? '2px solid #007BFF' : '2px solid transparent', transition: 'border 0.3s' }}
                >
                    <FaPlane className="search-icon" style={{marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'Flights' ? '#007BFF' : '#333' }} />
                    <span style={{ marginTop: '5px', fontSize: '1rem', color: selectedTopic === 'flights' ? '#007BFF' : '#333' }}>Flights</span>
                </button>
                <button
                    className={`search-button ${selectedTopic === 'Hotels' ? 'search-button-selected' : ''}`}
                    onClick={() => handleTopicSelect('Hotels')}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'Hotels' ? '2px solid #007BFF' : '2px solid transparent', transition: 'border 0.3s' }}
                >
                    <FaHotel className="search-icon" style={{ marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'Hotels' ? '#007BFF' : '#333' }} />
                    <span style={{ marginTop: '5px', fontSize: '1rem', color: selectedTopic === 'stays' ? '#007BFF' : '#333' }}>Stays</span>
                </button>
                <button
                    className={`search-button ${selectedTopic === 'Car Rentals' ? 'search-button-selected' : ''}`}
                    onClick={() => handleTopicSelect('Car Rentals')}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'Car Rentals' ? '2px solid #007BFF' : '2px solid transparent', transition: 'border 0.3s' }}
                >
                    <FaCar className="search-icon" style={{ marginLeft: '6px', fontSize: '2rem', color: selectedTopic === 'Car Rentals' ? '#007BFF' : '#333' }} />
                    <span style={{ marginTop: '5px', fontSize: '1rem', color: selectedTopic === 'carRentals' ? '#007BFF' : '#333' }}>Car Rentals</span>
                </button>
                <button
                    className={`search-button ${selectedTopic === 'Attractions' ? 'search-button-selected' : ''}`}
                    onClick={() => handleTopicSelect('Attractions')}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'Attractions' ? '2px solid #007BFF' : '2px solid transparent', transition: 'border 0.3s' }}
                >
                    <FaBinoculars className="search-icon" style={{ marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'Attractions' ? '#007BFF' : '#333' }} />
                    <span style={{ marginTop: '5px', fontSize: '1rem', color: selectedTopic === 'attractions' ? '#007BFF' : '#333' }}>Attractions</span>
                </button>
                <button
                    className={`search-button ${selectedTopic === 'Airport Taxis' ? 'search-button-selected' : ''}`}
                    onClick={() => handleTopicSelect('Airport Taxis')}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', cursor: 'pointer', borderRadius: '8px', border: selectedTopic === 'Airport Taxis' ? '2px solid #007BFF' : '2px solid transparent', transition: 'border 0.3s' }}
                >
                    <FaTaxi className="search-icon" style={{marginLeft: '8px', fontSize: '2rem', color: selectedTopic === 'Airport Taxis' ? '#007BFF' : '#333' }} />
                    <span style={{ marginTop: '5px', fontSize: '1rem', color: selectedTopic === 'Airport Taxis' ? '#007BFF' : '#333' }}>Airport Taxis</span>
                </button>
            </div>
    
            {selectedTopic && (
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                    {selectedTopic === 'Flights' ? (
                        <>
                        <div style={{width: '1000px', backgroundColor: 'white', height: '350px', display: 'block', justifyContent: 'center', borderRadius: '10px'}} className=''>
                            <hr style={{border: '1.5px solid rgba(0, 122, 255, 0.85)', width: '100%'}}></hr>
                            <div style={{display: 'flex', width: '900px', justifyContent: 'space-between', padding: '20px' }}>
                                <label>
                                    Flying from:
                                    <Select id='originSelect' options={options} placeholder="Select a starting location" className='text-black w-96'/>
                                </label>

                                <label>
                                    Flying to:
                                    <Select id='destinationSelect' options={options} placeholder="Select a destination" className='text-black w-96'/>
                                </label>
                            </div>

                            
                            <button onClick={() => setOpenCalender(!openCalender)}>Select departure date</button>

                            {openCalender && (
                                <div>
                                    //TODO Implement a calender...
                                </div>
                            )}

                            
                        </div>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                placeholder={`${selectedTopic} in ${location}`}
                                className="search-input"
                                ref={searchInputRef}
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value)}}
                                style={{ width: '70%', padding: '12px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #ccc', boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)' }}
                            />
                            <button  onClick={handleSearch} style={{ marginLeft: '10px', padding: '12px 20px', fontSize: '1rem', borderRadius: '8px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
                                <FaSearch />
                            </button>
                        </>
                        )}
                </div>
            )}

    
            {loading && (
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                >
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>
            )}
        </div>
    </div>
    
    );
};

export default FilterContainer;