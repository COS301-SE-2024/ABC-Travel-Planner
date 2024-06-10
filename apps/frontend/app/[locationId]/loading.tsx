import styles from '../loading.module.css';
export default function Loading() {
    return (
        <div className="w-full p-4 md:p-8 bg-gray-100">
      <div className="photos-section grid grid-cols-1 md:grid-cols-4 gap-4" style={{ backgroundColor: '#e0e0e0', borderRadius: '8px', padding: '10px' }}>
        <div className="small-photos flex flex-col gap-4">
          <div className="rounded-lg shadow-lg" style={{ width: '200px', height: '200px', backgroundColor: '#f0f0f0' }}></div>
          <div className="rounded-lg shadow-lg" style={{ width: '200px', height: '200px', backgroundColor: '#f0f0f0' }}></div>
          <div className="rounded-lg shadow-lg" style={{ width: '200px', height: '200px', backgroundColor: '#f0f0f0' }}></div>
          <div className="rounded-lg shadow-lg" style={{ width: '200px', height: '200px', backgroundColor: '#f0f0f0' }}></div>
        </div>
        <div className="main-photos col-span-2 grid grid-cols-2 md:grid-cols-2 gap-3">
          <div className="main-photo">
            <div className="rounded-lg shadow-lg" style={{ width: '800px', height: '800px', backgroundColor: '#f0f0f0', marginLeft: '40px', marginTop: '30px' }}></div>
          </div>
          <div className="second-photo">
            <div className="rounded-lg shadow-lg" style={{ width: '900px', height: '900px', backgroundColor: '#f0f0f0', marginTop: '45px', marginRight: '30px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};