'use client'

import styled from '@emotion/styled'

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
`

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  background: rgba(179, 178, 178, 0.51);
  cursor: pointer;

  &:hover {
    background: rgba(179, 178, 178, 0.7);
  }
`

export default function SearchForm({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const query = e.target.elements.search.value.trim()
    if (query) {
      onSearch(query)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        name="search"
        type="search" 
        placeholder="Search Your City Name Here" 
      />
      <Button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </Button>
    </Form>
  )
}
