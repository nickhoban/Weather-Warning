window.addEventListener('DOMContentLoaded', function() {
  // RSS feed URL for Western Australia weather warnings
  var rssFeedUrl = 'http://www.bom.gov.au/fwo/IDZ00060.warnings_wa.xml';

  // Fetch the RSS feed
  fetch(rssFeedUrl)
    .then(function(response) {
      return response.text();
    })
    .then(function(xmlText) {
      var parser = new DOMParser();
      var xml = parser.parseFromString(xmlText, 'text/xml');

      // Find all "item" elements in the XML
      var items = xml.getElementsByTagName('item');

      // Process each item
      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        // Extract relevant information from the item
        var title = item.getElementsByTagName('title')[0].textContent;
        var description = item.getElementsByTagName('description')[0].textContent;
        var link = item.getElementsByTagName('link')[0].textContent;

        // Create a warning element
        var warningElement = document.createElement('div');
        warningElement.classList.add('warning');

        // Create and append the title element
        var titleElement = document.createElement('h2');
        titleElement.textContent = title;
        warningElement.appendChild(titleElement);

        // Create and append the description element
        var descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;
        warningElement.appendChild(descriptionElement);

        // Create and append the link element
        var linkElement = document.createElement('a');
        linkElement.textContent = 'Read more';
        linkElement.href = link;
        warningElement.appendChild(linkElement);

        // Append the warning element to the container
        document.getElementById('warning-container').appendChild(warningElement);
      }
    })
    .catch(function(error) {
      console.error('Error fetching RSS feed:', error);
    });
});
