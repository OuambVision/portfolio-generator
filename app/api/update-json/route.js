import { Octokit } from "@octokit/rest";
import { NextResponse } from 'next/server';

export async function PUT(request) {
    const { newBranchName, filePath, name } = await request.json();
    
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,     // Token généré
    });

    const owner = 'OuambVision';            // Nom utilisateur Github
    const repo = 'portfolio-generator';     // Depot sur GitHub

    try {
        // Obtenir le SHA du fichier JSON sur la nouvelle branche
        const { data: { sha: fileSha } } = await octokit.repos.getContent({
            owner,
            repo,
            path: filePath,
            ref: `heads/${newBranchName}`
        });

        // Modifier le contenu du fichier JSON
        const newContent = Buffer.from(JSON.stringify({ nom: name }, null, 2)).toString('base64');

        // Commit les changements sur la nouvelle branche
        const updateResponse = await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: filePath,
            message: `Update ${filePath} with new name`,
            content: newContent,
            sha: fileSha,
            branch: newBranchName
        });

        return NextResponse.json({ status: 200, updateResponse });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, error: error.message });
    }
}
