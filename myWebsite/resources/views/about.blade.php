@extends('layout');
@section('content')
<div class="content">
    <!-- First Container -->
    <div class="container-fluid bg-1 text-center">
        <h3 class="margin">Who Am I?</h3>
        <img src="/linkedInPic.jpg" class="img-responsive img-circle margin" style="display:inline" alt="Bird" width="350" height="350">
        <h3>I'm an young and motivated developer that always loves to learn!</h3>
    </div>
    <div class="container-fluid bg-2 text-center">
        <h3 class="margin"></h3>
    </div>
    <!-- Second Container -->
    <div class="container-fluid bg-3 text-center">
        <h3 class="margin" id="what">What Am I Working On?</h3>
        <p>I am currently working on <a href="https://github.com/nab0310/PersonalWebSite">this website</a> as well as working on an Android application to help plan easier collaboaration betweeen groups.</p>
        <p>If I am not working feverishly on my school projects, you can find me <a href="https://github.com/nab0310">creating android apps</a>, <a href="https://github.com/nab0310">making text adventure games</a>, or <a href="https://ignitecs.withgoogle.com/">teaching high schoolers the importance of coding</a>.</p>
    </div>
    <!-- Third Container (Grid) -->
    <div class="container-fluid bg-4 text-center">
        <h3 class="margin" id="where">Previous Experience</h3><br>
        <div class="row">
            <div class="col-sm-6">
                <h2><strong>Baxter Credit Union, Summer 2016</strong></h2>
                <p>Completely rewrote console applications in order to reduce dependencies on other systems.</p>
                <p>Developed new structure of interfaces that reduced dependencies on third party vendors.</p>
                <p>Developed applications using interfaces, dependency injection, and SQL to meet business needs.</p>
            </div>
            <div class="col-sm-6">
                <h2><strong>Baxter Credit Union, Summer 2015</strong></h2>
                <p>Worked to streamline and optimize communication between Web Banking and back end operations</p>
                <p>Designed VB.net programs to automate the process of welcoming customers to the Credit Union</p>
            </div>
        </div>
    </div>
</div>
@stop