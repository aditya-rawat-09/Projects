import Card from './components/card'

const App = () => {
    return(
        <div className='min-h-screen bg-gray-100 p-8'> 
            <div className='max-w-4xl mx-auto'>
                <h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>User Profiles</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <Card user='aman' age={18}/>
                    <Card user='ram' age={19}/>
                </div>
            </div>
        </div>
    )
}

export default App
