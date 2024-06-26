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
        // Obtenir la référence de la branche principale
        const { data: refData } = await octokit.git.getRef({
            owner,
            repo,
            ref: 'heads/main', // ou 'heads/master'
        });

        // Créer une nouvelle branche
        const newRef = await octokit.git.createRef({
            owner,
            repo,
            ref: `refs/heads/${newBranchName}`,
            sha: refData.object.sha,
        });

        return NextResponse.json({ status: 200, newRef });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ status: 500, error: error.message });
    }

    // return NextResponse.json({ questions: questions }, { status: 200 });
    // return NextResponse.json({ status: 200 });
}