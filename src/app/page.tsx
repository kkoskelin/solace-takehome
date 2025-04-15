"use client";

import { Advocate } from "@/types/Advocate";
import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const applySearchTerm = (searchTermFromInput: string) => {
    const searchTermPattern = new RegExp(searchTermFromInput.trim(), "i");
    const filterResults = advocates.filter(advocate => {
      return (
        searchTermPattern.test(advocate.firstName) ||
        searchTermPattern.test(advocate.lastName) ||
        searchTermPattern.test(advocate.city) ||
        searchTermPattern.test(advocate.degree) ||
        advocate.specialties.some(el => searchTermPattern.test(el))
      );
    });
    setFilteredAdvocates(filterResults);
  };

  return (
    <main className="m-6">
      <h1>Solace Advocates</h1>
      <form className="my-8" onSubmit={e => {
        applySearchTerm(searchTerm);
        e.preventDefault();
      }}>
        <label className="mr-1" htmlFor="search-term">Search:</label>
        <input
          className="border p-1 border-black rounded"
          aria-describedby="search-hint"
          id="search-term"
          type="search"
          value={searchTerm}
          required
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="ml-2 p-1 rounded border border-black bg-gray-200 active:bg-gray-300 ">Search</button>
        <button type="reset" className="ml-2 p-1 rounded border border-black" onClick={() => {
          setSearchTerm('');
          setFilteredAdvocates(advocates);
        }}>Reset</button>
        <div className="mt-05 text-sm" id="search-hint">Search by first name, last name, city, degree, or specialty</div>
      </form>
      <table
        className="border border-black w-full"
      >
        <thead className="bg-gray-200">
          <tr className="border border-black">
            <th className="px-1 py-1 border border-black align-top" scope="col">First Name</th>
            <th className="px-1 py-1 border border-black align-top" scope="col">Last Name</th>
            <th className="px-1 py-1 border border-black align-top" scope="col">City</th>
            <th className="px-1 py-1 border border-black align-top" scope="col">Degree</th>
            <th className="px-1 py-1 border border-black align-top" scope="col">Specialties</th>
            <th className="px-1 py-1 border border-black align-top" scope="col">Years of Experience</th>
            <th className="px-1 py-1 border border-black align-top" scope="col">Phone Number</th>
          </tr>
        </thead>
        <tbody className="border border-black">
          {filteredAdvocates.map((advocate, idx) =>
            <tr key={`advocate-${advocate.id}`} className={`border border-black ${idx % 2 !== 0 ? "bg-gray-100" : ""}`}>
              <td className="px-1 py-1 border border-black align-top">{advocate.firstName}</td>
              <td className="px-1 py-1 border border-black align-top">{advocate.lastName}</td>
              <td className="px-1 py-1 border border-black align-top">{advocate.city}</td>
              <td className="px-1 py-1 border border-black align-top">{advocate.degree}</td>
              <td className="px-1 py-1 border border-black align-top">
                {advocate.specialties.length === 0 && <li>No specialties listed</li>}
                {advocate.specialties.length > 0 && (
                  <ul className="list-inside list-disc">
                  {advocate.specialties.map(specialty =>
                    <li key={`specialty-${advocate.id}-${specialty}`}>
                      {specialty}
                    </li>
                  )}
                  </ul>
                )}
              </td>
              <td className="px-1 py-1 border border-black align-top text-right">{advocate.yearsOfExperience}</td>
              <td className="px-1 py-1 border border-black align-top text-center">{advocate.phoneNumber}</td>
            </tr>
           )}
        </tbody>
      </table>
    </main>
  );
}
