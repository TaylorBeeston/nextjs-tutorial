import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export type PostData = {
  id: string;
  title: string;
  date: string;
  contentHtml?: string;
};

export type PostId = {
  params: { id: string };
};

export const getSortedPostsData = (): PostData[] => {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData: PostData[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return { ...(matterResult.data as PostData), id };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getAllPostIds = (): PostId[] => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
};

export const getPostData = async (id: string): Promise<PostData> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return { ...(matterResult.data as PostData), contentHtml, id };
};
