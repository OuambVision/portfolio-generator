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
        let commits = [];
        let page = 1;
        let perPage = 100; // Nombre de commits par page (max 100)

        // Récupérer tous les commits de la branche principale
        while (true) {
            const response = await octokit.repos.listCommits({
                owner,
                repo,
                sha: 'main',
                per_page: perPage,
                page: page
            });

            commits = commits.concat(response.data);

            if (response.data.length < perPage) {
                // Il n'y a plus de pages suivantes, sortie de la boucle
                break;
            }

            page++;
        }

        // Récupérer le SHA du dernier commit
        const shaCommit = commits[0].sha;
        console.log(commits.length);
        for (let i = 0; i < commits.length; i++) {
            console.log((i + 1), commits[i].commit.message);
        }

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