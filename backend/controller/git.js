import axios from "axios";

import dotenv from "dotenv";
dotenv.config();
export const getUsersByLanguage = async (req, res, next) => {
  const { languages } = req.body;
  const token = process.env.GIT_TOKEN; // Replace with your GitHub access token
  const apiUrl = "https://api.github.com/search/users";
  const perPage = 10; // Number of results per page

  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: `language:${languages.join("+")}`,
        per_page: perPage,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("GitHub API response:", response.data);

    // Extract the user information from the response
    const users = response.data.items.map((user) => ({
      username: user.login,
      profileUrl: user.html_url,
      avatarUrl: user.avatar_url,
    }));

    console.log("Users:", users);

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// export const getUsersByLanguage = async (req, res, next) => {
//     const { languages } = req.body;
//     const token = process.env.GIT_TOKEN; // Replace with your GitHub access token
//     const apiUrl = "https://api.github.com/search/users";
//     const perPage = 10; // Number of results per page

//     try {
//       const response = await axios.get(apiUrl, {
//         params: {
//           q: `language:${languages.join('+')}`,
//           per_page: perPage,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const users = [];

//       // Iterate over each user
//       await Promise.all(
//         response.data.items.map(async (user) => {
//           const userReposResponse = await axios.get(user.repos_url, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           const repoLanguages = [];

//           // Iterate over each repository of the user
//           await Promise.all(
//             userReposResponse.data.map(async (repo) => {
//               const repoResponse = await axios.get(repo.languages_url, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               });

//               const languages = Object.keys(repoResponse.data);
//               repoLanguages.push(...languages);
//             })
//           );

//           users.push({
//             username: user.login,
//             profileUrl: user.html_url,
//             avatarUrl: user.avatar_url,
//             languages: repoLanguages,
//           });
//         })
//       );

//       console.log("Users:", users);

//       res.json({ users });
//     } catch (error) {
//       console.error("Error fetching users:", error.message);
//       res.status(500).json({ message: "Failed to fetch users" });
//     }
//   };

// // Usage example: Get GitHub users who prefer JavaScript
// getUsersByLanguage('javascript')
//   .then((users) => {
//     console.log(users);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
