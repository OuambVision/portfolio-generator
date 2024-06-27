import { Octokit } from "@octokit/rest";
import { NextResponse } from 'next/server';

export async function PUT(request) {
    const { name } = await request.json()
    // Appel à l'API Github
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,     // Token généré
    });

    const owner = 'OuambVision';            //Nom utilisateur Github
    const repo = 'portfolio-generator';     //Depot sur GitHub
    const newBranchName = `branche-${name}`;

    try {
          // Pour obtenir le dernier commit de la branche principale
          const { data: commits } = await octokit.repos.listCommits({
            owner,
            repo,
            sha: 'main',
            per_page: 1,
        });
        
        const shaCommit = commits[0].sha;
        console.log(commits[0]);

        // Créer une nouvelle branche
        const newRef = await octokit.git.createRef({
            owner,
            repo,
            ref: `refs/heads/${newBranchName}`,
            sha: shaCommit,
        });
        return NextResponse.json({ status: 200, newRef });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, error: error.message });
    }

    // return NextResponse.json({ questions: questions }, { status: 200 });
    // return NextResponse.json({ status: 200 });
}