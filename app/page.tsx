"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function Home() {
  const [inputData, setInputData] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:5001/api/send-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: inputData }),
    });

    if (response.ok) {
      console.log('Data sent successfully');
    }
  };

  const handleFetchData = async () => {
    const response = await fetch('http://localhost:5000/api/get-data');
    const result = await response.json();
    setFileContent(result.data);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div>
        <h1>Frontend 1.0</h1>
        <Input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <Button onClick={handleSubmit}>Отправить</Button>
      </div>

      <div>
        <Button onClick={handleFetchData}>Получить данные</Button>
        <div>{fileContent}</div>
      </div>

    </section>
  );
}
