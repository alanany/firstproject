async function fetchCourses() {
    try {
      const response = await fetch('http://localhost:3000/');
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      coursesContainer.innerHTML = '<p>Error loading courses</p>';
    }
  }
  fetchCourses();