node {
  
    stage('Clone Repository') {

        checkout scm
        
        //sh "git rev-parse --short HEAD > .git/commit-id"
        //imageTag = readFile("${env.WORKSPACE}/.git/commit-id").trim()
    }

    stage('Build and Push Docker Image') {

        def dockerfile = 'Dockerfile' 
        def customImage = docker.build("budakdigital/wmr:${env.JOB_BASE_NAME}-${$BUILD_NUMBER}", "-f ./${dockerfile} .") 
 
        docker.withRegistry('https://registry-1.docker.io', 'budakdigital-dockerhub-credential') {     
          //customImage.push("${imageTag}")
            customImage.push("${env.JOB_BASE_NAME}-${$BUILD_NUMBER}")
        } 
    }

    /*stage('Deploy') {

        sh "sed -i \"s/_imageTag/${imageTag}/g\" ${env.WORKSPACE}/k8s/deployment-test.yaml"
        sh "kubectl config use-context aks-dev"
        sh "kubectl apply -f ${env.WORKSPACE}/k8s/deployment-test.yaml"
        
    }*/
}
