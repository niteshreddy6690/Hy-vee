import Form from "@/components/atoms/form";
import InputField from "@/components/molecules/InputField";
import { useState } from "react";
import axios from "axios";
const { debounce, maxBy } = require("lodash");

async function makeParallelRequests(urls: string[]): Promise<any[]> {
  try {
    const requests: Promise<any>[] = [];
    urls.forEach((url) => {
      requests.push(axios.get(url));
    });
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data);
  } catch (error) {
    console.error("Error making parallel requests:", error);
    throw error; // Propagate the error
  }
}

const search = async ({ name }: { name: string }) => {
  /*    const ageData = await axios.get(`https://api.agify.io/?name=${name}`);
  const genderData = await axios.get(
    `https://api.genderize.io//?name=${name}`,
  );
  const nationalityData = await axios.get(
    `https://api.nationalize.io//?name=${name}`,
  );
  console.log("result", {
    age: ageData?.data?.age,
    gender: genderData?.data?.gender,
    nationality: maxBy(nationalityData.data.country, "probability")
      ?.country_id,
  });*/

  const results = await makeParallelRequests([
    `https://api.agify.io/?name=${name}`,
    `https://api.genderize.io//?name=${name}`,
    `https://api.nationalize.io//?name=${name}`,
  ]);

  return {
    name: name,
    age: results[0]?.age || "",
    gender: results[1]?.gender || "",
    nationality: maxBy(results[2].country || [], "probability")?.country_id,
  };
};
export default function UserInfo() {
  const [userData, setUserData] = useState({});
  const onSubmit = async ({ name }: any) => {
    const user = await search({ name });
    setUserData(user);
  };

  const onSearchByName = debounce(async function ({ name }: { name: string }) {
    const user = await search({ name });
    setUserData(user);
  }, 1000);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <InputField attribute="name" />
        <button type="submit">Submit</button>
      </Form>

      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{userData?.name}</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>{userData.age}</td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>{userData.gender}</td>
          </tr>
          <tr>
            <th>Nationality</th>
            <td>{userData.nationality}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
