"use client";
import { useEffect, useRef, useState } from 'react';
import { FaHotel, FaPlane, FaCar, FaBinoculars, FaTaxi, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import country_names from './country_names.json'
import combobox_values from './combobox.json'
import { CButton } from '@coreui/react';
import { Input } from '@nextui-org/react';

interface comboBoxValues {
    value: string,
    label: string
}

const countries:comboBoxValues[] = [];

country_names.forEach((item) => {
    countries.push({
        value: item.value,
        label: item.label
    })
})

const FilterContainer = () => {
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [openCalender, setOpenCalender] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [startingAirport, setStartingAirport] = useState<comboBoxValues[]>([])
    const [destinationAirport, setDestinationAirport] = useState<comboBoxValues[]>([])
    const [flights, setFlights] = useState<{
        start: string, 
        end: string, 
        adults: number,
        class: string
    }>
    ({
        start: '',
        end: '',
        adults: 0,
        class: '--'
    })

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ''

    const travelClassOptions = [
        {
            value: 'ECONOMY', label: 'Economy'
        },
        {
            value: 'PREMIUM_ECONOMY', label: 'Premium Economy'
        },
        {
            value: 'BUSINESS', label: 'Business Class'
        },
        {
            value: 'FIRST', label: 'First Class'
        }
    ];

    const handleTopicSelect = (topic: string) => {
        setSelectedTopic(topic);
        setSearchResults([]);
    };

    const handleStartCountry = (country: string) => {
        const startingAirports: comboBoxValues[] = []

        combobox_values.forEach((item) => {
            if (item.country === country) {
                startingAirports.push({
                    value: item.iata_code,
                    label: `${item.airport_name}, ${item.city}, ${item.country}`
                })
            }
        })

        setStartingAirport(startingAirports)
    }

    const handleDestinationCountry = (country: string) => {
        const destinationAirports: comboBoxValues[] = []

        combobox_values.forEach((item) => {
            if (item.country === country) {
                destinationAirports.push({
                    value: item.iata_code,
                    label: `${item.airport_name}, ${item.city}, ${item.country}`
                })
            }
        })

        setDestinationAirport(destinationAirports)
    }

    const id = localStorage.getItem('id') as string
    const location: any = JSON.parse(localStorage.getItem('location') || '{}').location;
    const actualId = JSON.parse(id).id

    const handleSearch = async () => {
        router.push(`/filter?id=${actualId}&topic=${selectedTopic}&term=${searchInputRef.current?.value}`);
    };

    const handleFlightSearch = async (startingPoint: string, endPoint: string, adults: number, departDate: string, travelClass: string) => {
        router.push(`/flights?start=${startingPoint}&end=${endPoint}&adults=${adults}&date=${departDate}&class=${travelClass}`)
    }

    // Country codes for starting & destination flights...
    const airports:comboBoxValues[] = []

    combobox_values.forEach((item) => {
        airports.push(
            {
                value: item.iata_code, 
                label: `${item.airport_name}, ${item.city}, ${item.country}`
            }
        )
    })

    // TODO Display info in a seperate page? Or just use a modified filter page?
    // TODO Frontend for filter page...
    
    return (
        <div style={{maxHeight: '1000px', height: '100%', maxWidth: '1050px', borderRadius: '4px'}}>
        <div  style={{alignContent:'center' ,height: '100%', maxHeight:'500px', width: '100%', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', borderRadius: '8px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px', marginTop: '30px', color: '#333' }}>Search at your Convenience!</h1>
            <p style={{ fontSize: '1.25rem', textAlign: 'center', marginBottom: '25px', color: '#666' }}>Click on an icon below to filter your search and provide better results</p>
    
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
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    {selectedTopic === 'Flights' ? (
                        <>
                        <div style={{width: '100%', backgroundColor: 'white', height: '315px', display: 'block', justifyContent: 'center', borderRadius: '10px', padding: '20px'}} className=''>
                            <hr style={{border: '1.5px solid rgba(65, 156, 247, 0.85)', width: '100%'}}></hr>
                            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', paddingTop: '5px' }}>
                                <label>
                                    Starting country:
                                    <Select id='originCountry' options={countries} placeholder="Select a starting location" className='text-black w-96' onChange={(selectedVal) => {handleStartCountry(selectedVal?.value || '')}}/>
                                </label>

                                <label>
                                    Destination country:
                                    <Select id='destinationCountry' options={countries} placeholder="Select a destination" className='text-black w-96' onChange={(selectedVal) => {handleDestinationCountry(selectedVal?.value || '')}}/>
                                </label>
                            </div>

                            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', paddingTop: '5px' }}>
                                <label>
                                    Flying from:
                                    <Select id='originAirport' options={startingAirport} placeholder="Select a starting location" className='text-black w-96' onChange={(val) => {
                                        const options = {
                                            start: val?.value || '',
                                            end: flights.end,
                                            adults: flights.adults,
                                            class: flights.class
                                        }

                                        setFlights(options)
                                    }}/>
                                </label>

                                <label>
                                    Flying to:
                                    <Select id='destinationAirport' options={destinationAirport} placeholder="Select a destination" className='text-black w-96' onChange={(val) => {
                                        const options = {
                                            start: flights.start,
                                            end: val?.value || '',
                                            adults: flights.adults,
                                            class: flights.class
                                        }

                                        setFlights(options)
                                    }}/>
                                </label>
                            </div>

                            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', paddingTop: '5px' }}>
                                <label>
                                    Number of adults:
                                    <Input placeholder="1" className='w-full rounded-sm' onChange={(item) => {
                                        const options = {
                                            start: flights.start,
                                            end: flights.end,
                                            adults: Number(item.target.value) || 0,
                                            class: flights.class
                                        }

                                        setFlights(options)
                                    }}></Input>
                                </label>

                                <label>
                                    Travel class:
                                    <Select id='travelClassSelect' options={travelClassOptions} placeholder="Select a travel class" className='text-black w-96' onChange={(val) => {
                                        const options = {
                                            start: flights.start,
                                            end: flights.end,
                                            adults: flights.adults,
                                            class: val?.value || '--'
                                        }

                                        setFlights(options)
                                    }}/>
                                </label>
                            </div>

                            <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', paddingTop: '5px', marginTop: '10px'}}>
                            {/* <button onClick={() => setOpenCalender(!openCalender)}>Select departure date</button> */}
                                <button className='w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700'
                                    onClick={
                                        async (val) => {
                                            console.log('Searching...')
                                            const adults = flights.adults;
                                            const destination = flights.end;
                                            const startingPoint = flights.start;
                                            const selectedDate = new Date()
                                            
                                            const departureDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth()+1).toString().length === 1 ? '0' + (selectedDate.getMonth()+1).toString() : selectedDate.getMonth()+1}-${selectedDate.getDate()}`
                                            const travelClass = flights.class;
                                            console.log(departureDate)

                                            //Go to another page and make api call
                                            handleFlightSearch(startingPoint, destination, adults, departureDate, travelClass)
                                        }
                                }
                                >Search</button>
                            </div>

                            
                            {openCalender && (
                                <div>
                                    //TODO Implement a calender...
                                </div>
                            )}

                            
                        </div>
                        </>
                    ) : (
                        <div className='flex ml-3 mr-3 mb-5 w-full justify-center border-solid border-1 border-slate-500'>
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
                        </div>
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