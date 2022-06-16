import axios from 'axios';
import { verify } from 'jsonwebtoken';

export default async function (req, res) {
  const { keyword, accessToken } = req.body;

  // put in a seperate utils file - START
  if (accessToken) {
    try {
      // const options = {
      //   headers: { Authorization: `Bearer ${accessToken}` },
      // };

      // const encodedKeyword = encodeURIComponent(keyword)

      // const url = `${process.env.OPEN_API}/questions?keyword=${encodedKeyword}`;

      // const { data } = await axios.get(url, options)

      return res.status(200).json({
        message: 'Successful',
        success: true,
        questions: [
          'What is the most important factor in an SEO campaign?Search for:What is the most important factor in an SEO campaign?',
          'What is SEO and how it works?Search for:What is SEO and how it works?',
          'What is SEO example?Search for:What is SEO example?',
          'What are the 4 main components of an SEO?Search for:What are the 4 main components of an SEO?',
          'What are the 4 main components of an SEO? Search for:What are the 4 main components of an SEO? ',
          'What is a marketing SEO?Search for:What is a marketing SEO?',
          'What is SEO example?Search for:What is SEO example?',
          'What are the 4 main components of an SEO?Search for:What are the 4 main components of an SEO?',
          'What is the most important factor in an SEO campaign?Search for:What is the most important factor in an SEO campaign?',
          'What is SEO and how it works?Search for:What is SEO and how it works?',
          'What is SEO example?Search for:What is SEO example?',
          'What are the 4 main components of an SEO?Search for:What are the 4 main components of an SEO?',
        ],
      });
    } catch (error) {
      return res.json({ message: 'An error occured!', success: false, error });
    }
  }
  return res.json({ message: 'Invalid token', success: false });
}
