const Card = (props) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 capitalize">{props.user}</h2>
                <p className="text-gray-600">Age: {props.age}</p>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde iure nulla velit tempora voluptatum eveniet, odio amet quasi veniam saepe.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
                View Profile
            </button>
        </div>
    )
}
export default Card