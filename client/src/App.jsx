import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div class="container">
      <h3 class="mb-4">Site Scout</h3>
      <form id="site-search-form">
			<div class="mb-3">
				<label for="websiteUrl" class="form-label">Website URL</label>
				<input type="url" class="form-control" id="websiteUrl" name="websiteUrl" placeholder="https://example.com" required/>
				<div class="form-text">Enter the full URL of the site.</div>
			</div>
			<div class="mb-3">
				<label for="searchTerm" class="form-label">Search Term</label>
				<input type="text" class="form-control" id="searchTerm" name="searchTerm" placeholder="e.g. Contact details" required/>
				<div class="form-text">Enter the keyword or phrase for searching.</div>
			</div>
			<button type="submit" class="btn btn-primary">Search</button>
      </form>
    </div>
    </>
  )
}

export default App
